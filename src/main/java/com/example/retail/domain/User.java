package com.example.retail.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;

/**
 * A user.
 */
@Entity
@Table(name = "USER")
@JsonPropertyOrder({"id", "username", "balance", "authorities", "createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate"})
public class User extends AbstractAuditingEntity {

    @NotNull
    @Pattern(regexp = "^[A-Za-z0-9]+$")
    @Size(min = 1, max = 50)
    @Column(name = "USERNAME", length = 50, unique = true, nullable = false)
    private String username;

    @JsonIgnore
    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "PASSWORD", length = 60)
    private String password;

    @Column(name = "BALANCE", precision = 21, scale = 2)
    private BigDecimal balance;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "JOIN_USER_ROLE", joinColumns = {
            @JoinColumn(name = "USER_ID")}, inverseJoinColumns = {
            @JoinColumn(name = "ROLE_ID")})
    private Set<Role> roles = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "creditor", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Debt> credit = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "debitor", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Debt> debt = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Transaction> transactions = new HashSet<>();

    public String getUsername() {
        return username;
    }

    // Lowercase the login before saving it in database
    public void setUsername(String login) {
        this.username = login.toLowerCase(Locale.ENGLISH);
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Debt> getCredit() {
        return credit;
    }

    public void setCredit(Set<Debt> credit) {
        this.credit = credit;
    }

    public Set<Debt> getDebt() {
        return debt;
    }

    public void setDebt(Set<Debt> debt) {
        this.debt = debt;
    }

    public Set<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(Set<Transaction> transactions) {
        this.transactions = transactions;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 11 * hash + Objects.hashCode(this.id);
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
        final User other = (User) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return "User{" + "id=" + id + ", username=" + username + ", balance=" + balance + '}';
    }

}
