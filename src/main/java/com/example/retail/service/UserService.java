package com.example.retail.service;

import com.example.retail.config.Constants;
import com.example.retail.domain.Role;
import com.example.retail.domain.Debt;
import com.example.retail.domain.Transaction;
import com.example.retail.domain.User;
import com.example.retail.repository.DebtRepository;
import com.example.retail.repository.TransactionRepository;
import com.example.retail.repository.UserRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.retail.repository.RoleRepository;

/**
 * Service class for managing transactions.
 */
@Service
@Transactional
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    DebtRepository debtRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    /**
     * Find User by username
     *
     * @param username
     * @return User
     */
    public User findOneByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    /**
     * Create User by username
     *
     * @param username
     * @return User
     */
    public User create(String username) {

        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(Constants.PASSWORD));
        user.setBalance(BigDecimal.ZERO);

        Role authority = roleRepository.findOneByName(Constants.ROLE_USER).orElse(null);
        if (authority == null) {
            authority = new Role();
            authority.setId(UUID.randomUUID().toString());
            authority.setName(Constants.ROLE_USER);
            roleRepository.save(authority);
        }

        user.getRoles().add(authority);

        return userRepository.save(user);
    }

    /**
     * Create Transaction for deposit
     *
     * @param user
     * @param amount
     */
    public void deposit(User user, BigDecimal amount) {

        Transaction transaction = new Transaction();
        transaction.setId(UUID.randomUUID().toString());
        transaction.setType(Transaction.Type.DEPOSIT);
        transaction.setUser(user);
        transaction.setTransactionDate(LocalDate.now());
        transaction.setAmount(amount);
        transactionRepository.save(transaction);
    }

    /**
     * Create Transaction for withdraw
     *
     * @param user
     * @param amount
     */
    public void withdraw(User user, BigDecimal amount) {

        Transaction transaction = new Transaction();
        transaction.setId(UUID.randomUUID().toString());
        transaction.setType(Transaction.Type.WITHDRAW);
        transaction.setUser(user);
        transaction.setTransactionDate(LocalDate.now());
        transaction.setAmount(amount);
        transactionRepository.save(transaction);
    }

    /**
     * Update User balance
     *
     * @param user
     * @param amount
     */
    public void updateBalance(User user, BigDecimal amount) {
        user.setBalance(amount);
        userRepository.save(user);
    }

    /**
     * Create Debt record for creditor and debitor
     *
     * @param creditor
     * @param debitor
     * @param amount
     */
    public void createDebt(User creditor, User debitor, BigDecimal amount) {

        Debt debt = new Debt();
        debt.setId(UUID.randomUUID().toString());
        debt.setCreditor(creditor);
        debt.setDebitor(debitor);
        debt.setAmount(amount);
        debtRepository.save(debt);
    }

}
