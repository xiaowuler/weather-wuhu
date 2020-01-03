package com.pingchuan.weather.service;

import java.util.List;
import com.pingchuan.weather.entity.Department;

public interface DepartmentService {

    List<Department> getAllDepartment();

    List<Department> findAllByParentDepartId(int parentDepartId);

    List<Department> findDepartIdByName(String departmentName);

    List<Department> findAllCity();

    List<Department> findAllCounty(Integer departId);

    List<Department> findAllProvince();
}