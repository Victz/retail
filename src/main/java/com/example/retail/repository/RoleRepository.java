package com.example.retail.repository;

import com.example.retail.domain.Role;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Role} entity.
 */
public interface RoleRepository extends JpaRepository<Role, String> {

    /**
     * Find by name
     *
     * @param name
     * @return Optional User
     */
    Optional<Role> findOneByName(String name);
}
