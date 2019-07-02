package com.pingchuan.weather.Service;

import com.pingchuan.weather.entity.PageResult;
import com.pingchuan.weather.entity.User;
public interface UserService {

    User findOneById(int userId);

    void updateAll(int userId, int departId);

    void updatePassword(int userId, String password);

    PageResult<User> findAllByPage(int page, int rows);
}
