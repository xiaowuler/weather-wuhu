package com.pingchuan.weather.service.impl;

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

import java.util.List;

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
    public void updateNameAndDepartmentIdById(int userId, int departmentId ,String name) {
        userMapper.updateNameAndDepartmentIdById(userId, departmentId,name);
    }

    @Override
    public User findUserByLoginName(String username) {
        return userMapper.findUserByLoginName(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findUserByLoginName(username);
        String encodePassword = passwordEncoder.encode(user.getLoginPwd());
        return new org.springframework.security.core.userdetails.User(user.getLoginName(), encodePassword, AuthorityUtils.commaSeparatedStringToAuthorityList("admin, user"));
    }

    @Override
    public void userRegister(String username, int departmentId, String name, String password) {
        User user = new User();
        user.setLoginName(username);
        user.setDepartmentId(departmentId);
        user.setName(name);
        user.setLoginPwd(password);

        userMapper.userRegister(user);
    }

    @Override
    public void deleteOneById(int userId) {
        userMapper.deleteOneById(userId);
    }

    @Override
    public void insertOne(String loginName,String loginPwd,String name,int departId) {
        User user = new User();
        user.setLoginName(loginName);
        user.setDepartmentId(departId);
        user.setName(name);
        user.setLoginPwd(loginPwd);
        userMapper.insertOne(user);
    }

    @Override
    public List<User> findByDepartNameAndName(Integer departmentId, String name) {
        return userMapper.findByDepartNameAndName(departmentId,name);
    }

    @Override
    public void updateStateById(int id, int state) {
        userMapper.updateStateById(id,state);
    }

    @Override
    public User findUserById(int id) {
        return userMapper.findUserById(id);
    }
}