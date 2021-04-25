package com.example.retail.repository;

import com.example.retail.domain.Debt;
import com.example.retail.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the Debt entity.
 */
@Repository
public interface DebtRepository extends JpaRepository<Debt, String> {

    /**
     * Find Debt by debitor
     *
     * @param debitor User
     * @return Optional Debt
     */
    @Query("SELECT d FROM Debt d WHERE d.debitor = ?1")
    List<Debt> findByDebitor(User debitor);

    /**
     * Find Debt by creditor
     *
     * @param creditor User
     * @return OptionalDebt
     */
    @Query("SELECT d FROM Debt d WHERE d.creditor = ?1")
    List<Debt> findByCreditor(User creditor);

    /**
     * Find Debt by both debitor and creditor
     *
     * @param debitor User
     * @param creditor User
     * @return Optional Debt
     */
    @Query("SELECT d FROM Debt d WHERE d.debitor = ?1 and d.creditor = ?2")
    List<Debt> findByDebitorAndCreditor(User debitor, User creditor);
}
