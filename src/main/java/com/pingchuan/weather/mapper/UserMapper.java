package com.pingchuan.weather.mapper;

import java.util.List;
import com.pingchuan.weather.entity.User;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    int findCount();

    User findOneById(@Param("userId") int userId);

    List<User> getUserByPage(@Param("pageIndex") int pageIndex, @Param("pageSize") int pageSize);

    void updatePassword(@Param("userId") int userId, @Param("password") String password);

    void updateAll(@Param("userId") int userId, @Param("departId") int departId);

    User userLogin(@Param("loginName") String loginName, @Param("loginPwd") String loginPwd);
}