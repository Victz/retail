package com.example.retail.api;

import com.example.retail.api.dto.UserModel;
import com.example.retail.api.exception.BadRequestException;
import com.example.retail.config.Constants;
import com.example.retail.domain.User;
import com.example.retail.security.DomainUserDetails;
import com.example.retail.security.SecurityUtils;
import com.example.retail.security.TokenProvider;
import com.example.retail.service.UserService;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * Controller to authenticate users.
 */
@RestController
@RequestMapping("/api")
public class UserApi {

    private final Logger log = LoggerFactory.getLogger(UserApi.class);

    private final UserService userService;

    private final TokenProvider tokenProvider;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public UserApi(UserService userService, TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    /**
     * User Login
     *
     * @param userModel
     * @return UserModel with JWT Token
     */
    @PostMapping("/login")
    public ResponseEntity<UserModel> login(@Valid @RequestBody UserModel userModel) {

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userModel.getUsername(), Constants.PASSWORD);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        boolean rememberMe = false;
        String jwt = tokenProvider.createToken(authentication, rememberMe);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + jwt);

        UserDetails userDetails = (DomainUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());

        userModel.setAccessToken(jwt);
        userModel.setRoles(roles);
        return new ResponseEntity<>(userModel, httpHeaders, HttpStatus.OK);
    }

    /**
     * User Registration
     *
     * @param userModel
     * @return UserEntity
     */
    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody UserModel userModel) {

        log.debug("REST request to register new user : {}", userModel.getUsername());

        User user = userService.findOneByUsername(userModel.getUsername());
        if (user != null) {
            throw new BadRequestException("username already exist! ");
        }

        user = userService.create(userModel.getUsername());
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> profile() {
        User user = userService.findOneByUsername(SecurityUtils.getCurrentUserLogin().get());
        return ResponseEntity.ok().body(user);
    }
}
