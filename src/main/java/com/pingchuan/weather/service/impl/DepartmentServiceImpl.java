package com.pingchuan.weather.service.impl;

import java.util.List;
import com.pingchuan.weather.entity.Department;
import com.pingchuan.weather.mapper.DepartmentMapper;
import com.pingchuan.weather.service.DepartmentService;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentMapper departmentMapper;

    @Override
    public List<Department> getAllDepartment() {
        return departmentMapper.getAllDepartment();
    }

    @Override
    public List<Department> findAllByParentDepartId(int parentDepartId) {
        return departmentMapper.findAllByParentId(parentDepartId);
    }

    @Override
    public List<Department> findDepartIdByName(String departmentName) {
        return departmentMapper.findDepartIdByName(departmentName);
    }

    @Override
    public List<Department> findAllCity() {
        return departmentMapper.findAllCity();
    }

    @Override
    public List<Department> findAllCounty(Integer departId) {
        return departmentMapper.findAllCounty(departId);
    }

    @Override
    public List<Department> findAllProvince() {
        return departmentMapper.findAllProvince();
    }
}