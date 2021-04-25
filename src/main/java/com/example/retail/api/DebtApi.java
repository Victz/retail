package com.example.retail.api;

import com.example.retail.domain.Debt;
import com.example.retail.domain.User;
import com.example.retail.repository.DebtRepository;
import com.example.retail.repository.UserRepository;
import com.example.retail.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing {@link com.example.retail.domain.Transaction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DebtApi {

    private final Logger log = LoggerFactory.getLogger(DebtApi.class);

    private final UserRepository userRepository;
    private final DebtRepository debtRepository;

    public DebtApi(UserRepository userRepository, DebtRepository debtRepository) {
        this.userRepository = userRepository;
        this.debtRepository = debtRepository;
    }

    /**
     * {@code GET  /debts} : get own debts
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of debts in body.
     */
    @GetMapping("/debts")
    public List<Debt> getOwnDebts() {
        log.debug("REST request to get own Debts");

        User user = userRepository.findByUsername(SecurityUtils.getCurrentUserLogin().get()).orElse(null);
        return debtRepository.findByDebitor(user);
    }
    
        /**
     * {@code GET  /debts} : get own Credits
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of debts in body.
     */
    @GetMapping("/credits")
    public List<Debt> getOwnCredits() {
        log.debug("REST request to get own Credits");

        User user = userRepository.findByUsername(SecurityUtils.getCurrentUserLogin().get()).orElse(null);
        return debtRepository.findByCreditor(user);
    }

}
