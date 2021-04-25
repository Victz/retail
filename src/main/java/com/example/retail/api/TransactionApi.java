package com.example.retail.api;

import com.example.retail.api.dto.TransactionModel;
import com.example.retail.api.exception.BadRequestException;
import com.example.retail.domain.Debt;
import com.example.retail.domain.Transaction;
import com.example.retail.domain.User;
import com.example.retail.repository.DebtRepository;
import com.example.retail.repository.TransactionRepository;
import com.example.retail.repository.UserRepository;
import com.example.retail.security.SecurityUtils;
import com.example.retail.service.UserService;
import java.math.BigDecimal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import javax.validation.Valid;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;

/**
 * REST controller for managing {@link com.example.retail.domain.Transaction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TransactionApi {

    private final Logger log = LoggerFactory.getLogger(TransactionApi.class);

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final DebtRepository debtRepository;

    public TransactionApi(TransactionRepository transactionRepository, UserRepository userRepository, UserService userService, DebtRepository debtRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.debtRepository = debtRepository;
    }

    /**
     * {@code GET  /transactions} : get own transactions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of transactions in body.
     */
    @GetMapping("/transactions")
    public List<Transaction> getOwnTransactions() {
        log.debug("REST request to get own Transactions");

        User user = userRepository.findByUsername(SecurityUtils.getCurrentUserLogin().get()).orElse(null);
        return transactionRepository.findByUser(user, Sort.by(Sort.Direction.DESC, "lastModifiedDate"));
    }

    /**
     * {@code POST  /transaction/topup} : Top Up.
     *
     * @param transactionModel
     * @return Void
     */
    @PostMapping("/transaction/topup")
    @Transactional
    public ResponseEntity<Void> topup(@Valid @RequestBody TransactionModel transactionModel) {
        log.debug("REST request to topup : {}", transactionModel);
        if (transactionModel.getAmount() == null) {
            throw new BadRequestException("Amount must not be empty!");
        }

        User user = userRepository.findByUsername(SecurityUtils.getCurrentUserLogin().get()).orElse(null);

        userService.deposit(user, transactionModel.getAmount());
        userService.updateBalance(user, user.getBalance().add(transactionModel.getAmount()));

        // Clear if any pending debt
        List<Debt> debts = debtRepository.findByDebitor(user);
        if (debts != null && !debts.isEmpty()) {
            for (Debt debt : debts) {
                if (user.getBalance().compareTo(debt.getAmount()) > 0) {

                    userService.withdraw(user, debt.getAmount());
                    userService.updateBalance(user, user.getBalance().subtract(debt.getAmount()));
                    userService.deposit(debt.getCreditor(), debt.getAmount());
                    userService.updateBalance(debt.getCreditor(), debt.getCreditor().getBalance().add(debt.getAmount()));
                    debtRepository.delete(debt);

                } else if (user.getBalance().compareTo(BigDecimal.ZERO) > 0) {

                    BigDecimal transactionAmount = user.getBalance();
                    userService.withdraw(user, transactionAmount);
                    userService.updateBalance(user, user.getBalance().subtract(transactionAmount));
                    userService.deposit(debt.getCreditor(), transactionAmount);
                    userService.updateBalance(debt.getCreditor(), debt.getCreditor().getBalance().add(transactionAmount));

                    BigDecimal newDebtAmount = debt.getAmount().subtract(transactionAmount);
                    debt.setAmount(newDebtAmount);
                    debtRepository.save(debt);

                } else {
                    break;
                }
            }
        }

        return ResponseEntity.ok().build();
    }

    /**
     * {@code POST  /transaction/pay} : Pay.
     *
     * @param transactionModel
     * @return Void
     */
    @PostMapping("/transaction/pay")
    @Transactional
    public ResponseEntity<Void> pay(@Valid @RequestBody TransactionModel transactionModel) {
        log.debug("REST request to pay : {}", transactionModel);
        if (StringUtils.isBlank(transactionModel.getPayee())) {
            throw new BadRequestException("Payee must not be empty!");
        }
        User payee = userRepository.findByUsername(transactionModel.getPayee()).orElse(null);
        if (payee == null) {
            throw new BadRequestException("Payee " + transactionModel.getPayee() + " doesn't exist!");
        }

        if (transactionModel.getAmount() == null) {
            throw new BadRequestException("Amount must not be empty!");
        }

        User user = userRepository.findByUsername(SecurityUtils.getCurrentUserLogin().get()).orElse(null);

        // Clear if any pending debt
        List<Debt> debts = debtRepository.findByDebitorAndCreditor(payee, user);
        if (debts != null && !debts.isEmpty()) {
            for (Debt debt : debts) {
                if (transactionModel.getAmount().compareTo(debt.getAmount()) > 0) {

                    userService.withdraw(debt.getCreditor(), debt.getAmount());
                    userService.deposit(debt.getDebitor(), debt.getAmount());
                    debtRepository.delete(debt);
                    transactionModel.setAmount(transactionModel.getAmount().subtract(debt.getAmount()));

                } else if (transactionModel.getAmount().compareTo(BigDecimal.ZERO) > 0) {

                    userService.withdraw(debt.getCreditor(), transactionModel.getAmount());
                    userService.deposit(debt.getDebitor(), transactionModel.getAmount());
                    BigDecimal newDebtAmount = debt.getAmount().subtract(transactionModel.getAmount());
                    debt.setAmount(newDebtAmount);
                    debtRepository.save(debt);

                    transactionModel.setAmount(BigDecimal.ZERO);
                } else {
                    break;
                }

            }
        }

        // Transfer the remaining amount
        if (transactionModel.getAmount().compareTo(BigDecimal.ZERO) > 0) {
            if (user.getBalance().compareTo(transactionModel.getAmount()) > 0) {

                userService.withdraw(user, transactionModel.getAmount());
                userService.updateBalance(user, user.getBalance().subtract(transactionModel.getAmount()));

                userService.deposit(payee, transactionModel.getAmount());
                userService.updateBalance(payee, payee.getBalance().add(transactionModel.getAmount()));

            } else {

                BigDecimal transactionAmount = user.getBalance();
                userService.withdraw(user, transactionAmount);
                userService.updateBalance(user, BigDecimal.ZERO);
                userService.deposit(payee, transactionAmount);
                userService.updateBalance(payee, payee.getBalance().add(transactionAmount));

                BigDecimal debtAmount = transactionModel.getAmount().subtract(transactionAmount);
                userService.createDebt(payee, user, debtAmount);
            }
        }

        return ResponseEntity.ok().build();
    }

    /**
     * {@code PUT  /transactions} : Updates an existing transaction.
     *
     * @param transaction the transaction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transaction, or with status {@code 400 (Bad Request)} if the transaction is not
     * valid, or with status {@code 500 (Internal Server Error)} if the transaction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
//    @PutMapping("/transactions")
//    public ResponseEntity<Transaction> updateTransaction(@Valid @RequestBody Transaction transaction) throws URISyntaxException {
//        log.debug("REST request to update Transaction : {}", transaction);
//        if (transaction.getId() == null) {
//            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
//        }
//        Transaction result = transactionRepository.save(transaction);
//        return ResponseEntity.ok()
//            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, transaction.getId().toString()))
//            .body(result);
//    }
//
//    /**
//     * {@code GET  /transactions/:id} : get the "id" transaction.
//     *
//     * @param id the id of the transaction to retrieve.
//     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the transaction, or with status {@code 404 (Not Found)}.
//     */
//    @GetMapping("/transactions/{id}")
//    public ResponseEntity<Transaction> getTransaction(@PathVariable Long id) {
//        log.debug("REST request to get Transaction : {}", id);
//        Optional<Transaction> transaction = transactionRepository.findById(id);
//        return ResponseUtil.wrapOrNotFound(transaction);
//    }
//
//    /**
//     * {@code DELETE  /transactions/:id} : delete the "id" transaction.
//     *
//     * @param id the id of the transaction to delete.
//     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
//     */
//    @DeleteMapping("/transactions/{id}")
//    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
//        log.debug("REST request to delete Transaction : {}", id);
//        transactionRepository.deleteById(id);
//        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
//    }
}
