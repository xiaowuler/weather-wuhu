package com.pingchuan.weather.Mapper;

import com.pingchuan.weather.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {

    List<User> findAllByPage(@Param("page") int page, @Param("rows") int rows);

    int findCount();
}
