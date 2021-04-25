package com.example.retail.config;

/**
 * Application constants.
 */
public final class Constants {

    public static final String ROLE_ADMIN = "ROLE_ADMIN";

    public static final String ROLE_USER = "ROLE_USER";

    public static final String ROLE_ANONYMOUS = "ROLE_ANONYMOUS";

    // Regex for acceptable logins
    public static final String USERNAME_REGEX = "^(?>[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*)|(?>[_.@A-Za-z0-9-]+)$";

    public static final String SYSTEM_ACCOUNT = "system";
    public static final String DEFAULT_LANGUAGE = "en";
    public static final String ANONYMOUS_USER = "anonymoususer";
    
    public static final String PASSWORD = "password";

    private Constants() {
    }
}
