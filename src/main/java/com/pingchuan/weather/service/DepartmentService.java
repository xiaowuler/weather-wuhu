package com.pingchuan.weather.service;

import java.util.List;
import com.pingchuan.weather.entity.Department;

public interface DepartmentService {

    List<Department> findAll();

    List<Department> findAllByCity();

    List<Department> findAllByParentDepartId(int parentDepartId);

}
