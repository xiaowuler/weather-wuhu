package com.pingchuan.weather.Service;

import com.pingchuan.weather.entity.PageResult;
import com.pingchuan.weather.entity.User;
public interface UserService {

    PageResult<User> findAllByPage(int page, int rows);

}
