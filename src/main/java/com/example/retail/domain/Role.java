package com.example.retail.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Objects;

/**
 * An authority (a security role) used by Spring Security.
 */
@Entity
@Table(name = "ROLE")
public class Role extends AbstractAuditingEntity {

    @NotNull
    @Size(max = 50)
    @Column(name = "NAME", length = 50)
    private String name;

    @Size(max = 500)
    @Column(name = "DESCRIPTION", length = 500)
    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public int hashCode() {
        int hash = 5;
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
        final Role other = (Role) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return "Role{" + "id=" + id + ", name=" + name + ", description=" + description + '}';
    }

}
