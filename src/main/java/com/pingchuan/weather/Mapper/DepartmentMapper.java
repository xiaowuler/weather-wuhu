package com.pingchuan.weather.Mapper;

import com.pingchuan.weather.entity.Department;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface DepartmentMapper {

    Department findOneById(@Param("departId") int departId);

    List<Department> findAllByParentId(@Param("parentId") Integer parentId);

    List<Department> findAllCity();

    List<Department> findAll();
}