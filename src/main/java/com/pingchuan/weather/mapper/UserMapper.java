package com.pingchuan.weather.mapper;

import java.util.List;
import com.pingchuan.weather.entity.User;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    int getUserTotalCount();

    User findOneById(@Param("userId") int userId);

    List<User> getUserByPage(@Param("pageIndex") int pageIndex, @Param("pageSize") int pageSize);

    void updatePasswordById(@Param("userId") int userId, @Param("password") String password);

    void updateDepartmentIdById(@Param("userId") int userId, @Param("departmentId") int departmentId);

    User findUserByLoginName(@Param("username") String username);

    void userRegister(@Param("user") User user);
}