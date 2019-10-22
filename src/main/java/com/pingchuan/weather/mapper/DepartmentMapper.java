package com.pingchuan.weather.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.pingchuan.weather.entity.Department;


@Mapper
public interface DepartmentMapper {

    // 查询所有的城市
    List<Department> findAllCity();
    // 通过父单位Id查询子单位信息
    List<Department> findAllByParentId(@Param("parentId") Integer parentId);
    // 根据单位Id查询单位信息
    Department findOneById(@Param("departId") int departId);

    List<Department> findAll();
}