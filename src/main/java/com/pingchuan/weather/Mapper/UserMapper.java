package com.pingchuan.weather.Mapper;

import com.pingchuan.weather.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {

    int findCount();

    User findOneById(@Param("userId") int userId);

    List<User> findAllByPage(@Param("page") int page, @Param("rows") int rows);

    void updatePassword(@Param("userId") int userId, @Param("password") String password);

    void updateAll(@Param("userId") int userId, @Param("departId") String departId);
}
