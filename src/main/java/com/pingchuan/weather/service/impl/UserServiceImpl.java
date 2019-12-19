package com.pingchuan.weather.service.impl;

import java.util.Map;
import java.util.HashMap;

import com.pingchuan.weather.entity.User;
import com.pingchuan.weather.entity.PageResult;
import com.pingchuan.weather.mapper.UserMapper;
import com.pingchuan.weather.service.UserService;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public PageResult<User> getUserByPage(int pageIndex, int pageSize) {

        PageResult<User> pageResult = new PageResult<>();
        pageResult.setRows(userMapper.getUserByPage(pageIndex, pageSize));
        pageResult.setTotal(userMapper.getUserTotalCount());

        return pageResult;
    }

    @Override
    public void updatePasswordById(int userId, String password) {
        userMapper.updatePasswordById(userId, password);
    }

    @Override
    public User findOneById(int userId) {
        return userMapper.findOneById(userId);
    }

    @Override
    public void updateDepartmentIdById(int userId, int departmentId) {
        userMapper.updateDepartmentIdById(userId, departmentId);
    }

    @Override
    public User findUserByLoginName(String username) {
        return userMapper.findUserByLoginName(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findUserByLoginName(username);
        String encodePassword = passwordEncoder.encode(user.getLoginPwd());
        return new org.springframework.security.core.userdetails.User(user.getLoginName(), encodePassword, AuthorityUtils.commaSeparatedStringToAuthorityList("admin"));
    }
}