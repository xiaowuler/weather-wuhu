package com.pingchuan.weather.service;

import java.util.Map;
import com.pingchuan.weather.entity.User;
import com.pingchuan.weather.entity.PageResult;

public interface UserService {

    User findOneById(int userId);

    void updateAll(int userId, int departId);

    void updatePassword(int userId, String password);

    PageResult<User> getUserByPage(int pageIndex, int pageSize);

    Map<String, User> userLogin(String loginName, String loginPwd);
}