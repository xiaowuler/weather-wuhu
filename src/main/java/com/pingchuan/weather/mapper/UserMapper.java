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

    void updateNameAndDepartmentIdById(@Param("userId") int userId, @Param("departmentId") int departmentId,@Param("name") String name);

    User findUserByLoginName(@Param("username") String username);

    void userRegister(@Param("user") User user);

    void deleteOneById(int userId);

    void insertOne(@Param("user") User user);

    List<User> findByDepartNameAndName(@Param("departmentId")Integer departmentId,@Param("name") String name);

    void updateStateById(@Param("id") int id, @Param("state") int state);

    User findUserById(@Param("id") int id);
}