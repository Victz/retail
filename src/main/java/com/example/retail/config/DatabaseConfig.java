package com.example.retail.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories("com.example.retail.repository")
@EnableJpaAuditing(auditorAwareRef = "databaseAuditorAware")
@EnableTransactionManagement
public class DatabaseConfig {

    private final Logger log = LoggerFactory.getLogger(DatabaseConfig.class);

    private final Environment env;

    public DatabaseConfig(Environment env) {
        this.env = env;
    }

}
