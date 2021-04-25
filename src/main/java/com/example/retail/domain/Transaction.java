package com.example.retail.domain;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 *
 * @author shawn
 */
@Entity
@Table(name = "[TRANSACTION]")
public class Transaction extends AbstractAuditingEntity {

    @NotNull
    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "[TYPE]")
    private Type type;

    @NotNull
    @Column(name = "AMOUNT", precision = 21, scale = 2, nullable = false)
    private BigDecimal amount;

    @Column(name = "TRANSACTION_DATE")
    private LocalDate transactionDate;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 67 * hash + Objects.hashCode(this.id);
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
        final Transaction other = (Transaction) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return "Transaction{" + "id=" + id + ", type=" + type + ", amount=" + amount + ", transactionDate=" + transactionDate + '}';
    }

    public enum Type {

        WITHDRAW("withdraw"), DEPOSIT("deposit");

        private String description;

        private Type(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

    }

}
