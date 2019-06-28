package com.pingchuan.weather.Service;

import com.pingchuan.weather.entity.User;

import java.util.List;

public interface UserService {

    List<User> findAllByPage(int page, int rows);

}
