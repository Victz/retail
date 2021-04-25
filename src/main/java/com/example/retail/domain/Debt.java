package com.example.retail.domain;

import java.math.BigDecimal;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 *
 * @author shawn
 */
@Entity
@Table(name = "DEBT")
public class Debt extends AbstractAuditingEntity {

    @NotNull
    @ManyToOne
    @JoinColumn(name = "CREDITOR_ID", nullable = false)
    private User creditor;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "DEBITOR_ID", nullable = false)
    private User debitor;

    @NotNull
    @Column(name = "AMOUNT", precision = 21, scale = 2, nullable = false)
    private BigDecimal amount;

    public User getCreditor() {
        return creditor;
    }

    public void setCreditor(User creditor) {
        this.creditor = creditor;
    }

    public User getDebitor() {
        return debitor;
    }

    public void setDebitor(User debitor) {
        this.debitor = debitor;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 23 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Debt other = (Debt) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return "Debt{" + "id=" + id + ", creditor=" + creditor + ", debitor=" + debitor + ", amount=" + amount + '}';
    }

}
