package com.example.retail.repository;

import com.example.retail.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link User} entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {

    /**
     * Find User by username
     *
     * @param username
     * @return Optional User
     */
    Optional<User> findByUsername(String username);

    /**
     * Find User by username with Authorities
     *
     * @param username
     * @return Optional User
     */
    @EntityGraph(attributePaths = "roles")
    Optional<User> findWithRolesByUsername(String username);

    /**
     * Find User by username with credit and debt records
     *
     * @param username
     * @return Optional User
     */
    @Query("SELECT u FROM User u left join fetch u.credit c left join fetch u.debt d WHERE u.username = :username")
    Optional<User> findOneWithDebtsByUsername(String username);

}
