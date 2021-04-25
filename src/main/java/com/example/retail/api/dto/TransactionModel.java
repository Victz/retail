package com.example.retail.api.dto;

import java.math.BigDecimal;

/**
 *
 * Transaction DTO
 */
public class TransactionModel {

    private String payee;

    private BigDecimal amount;

    public String getPayee() {
        return payee;
    }

    public void setPayee(String payee) {
        this.payee = payee;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

}
