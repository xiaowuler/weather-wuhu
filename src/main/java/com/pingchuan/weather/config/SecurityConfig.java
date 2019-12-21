package com.pingchuan.weather.config;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.pingchuan.weather.service.impl.UserServiceImpl;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    UserDetailsService userService(){
        return new UserServiceImpl();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService()).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/plug/**", "/css/**", "/images/**", "/js/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin()
                .loginPage("/login.html")
                .loginProcessingUrl("/userLogin")
                .failureUrl("/login.html")
                .successHandler(new AuthenticationSuccessHandler() {
                            @Override
                            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                                                Authentication authentication) throws IOException {
                                response.setContentType("application/json;charset=utf-8");
                                RequestCache cache = new HttpSessionRequestCache();
                                SavedRequest savedRequest = cache.getRequest(request, response);
                                if (savedRequest == null){
                                    response.sendRedirect("http://localhost:9000/");
                                    return;
                                }

                                String url = savedRequest.getRedirectUrl();
                                response.sendRedirect(url);
                            }
                        }
                )
                .and()
                .logout().logoutSuccessUrl("/index.html")
                .and()
                .authorizeRequests()
                .antMatchers("/login.html").permitAll()
                .antMatchers("/User/**").permitAll()
                .antMatchers("/Department/**").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .headers()
                .frameOptions().disable()
                .and()
                .csrf().disable();
    }
}
