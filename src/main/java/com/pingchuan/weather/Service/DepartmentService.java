package com.pingchuan.weather.Service;

import com.pingchuan.weather.entity.Department;

import java.util.List;

public interface DepartmentService {

    List<Department> findAll();

    List<Department> findAllByCity();

    List<Department> findAllByParentDepartId(int parentDepartId);

}
