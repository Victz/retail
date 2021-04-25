package com.example.retail.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import java.util.Locale;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * A user.
 */
public class UserModel {

    @NotNull
    @Pattern(regexp = "^[A-Za-z0-9]+$")
    @Size(min = 1, max = 50)
    private String username;

    private String password;

    private String accessToken;

    private List<String> roles;

    public String getUsername() {
        return username;
    }

    public void setUsername(String login) {
        this.username = StringUtils.lowerCase(login, Locale.ENGLISH);
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

}
