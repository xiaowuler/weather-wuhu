package com.pingchuan.weather.service;

import com.pingchuan.weather.entity.User;
import com.pingchuan.weather.entity.PageResult;

import java.util.List;

public interface UserService {

    User findOneById(int userId);

    void updateNameAndDepartmentIdById(int userId, int departmentId,String name);

    void updatePasswordById(int userId, String password);

    PageResult<User> getUserByPage(int pageIndex, int pageSize);

    User findUserByLoginName(String username);

    void userRegister(String username, int departmentId, String name, String password);

    void deleteOneById(int userId);

    void insertOne(User user);

    List<User> findByDepartNameAndName(Integer departmentId, String name);

    void updateStateById(int id, int state);

    User findUserById(int id);
}