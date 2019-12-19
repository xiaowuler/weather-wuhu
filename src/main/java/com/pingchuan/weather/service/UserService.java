package com.pingchuan.weather.service;

import java.util.Map;

import com.pingchuan.weather.entity.User;
import com.pingchuan.weather.entity.PageResult;

public interface UserService {

    User findOneById(int userId);

    void updateDepartmentIdById(int userId, int departmentId);

    void updatePasswordById(int userId, String password);

    PageResult<User> getUserByPage(int pageIndex, int pageSize);

    Map<String, User> userLogin(String username, String password);

    User findUserByLoginName(String username);
}