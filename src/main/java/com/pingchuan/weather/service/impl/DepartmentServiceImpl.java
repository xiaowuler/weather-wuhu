package com.pingchuan.weather.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.pingchuan.weather.entity.Department;
import com.pingchuan.weather.mapper.DepartmentMapper;
import com.pingchuan.weather.service.DepartmentService;

/**
 * @description: 单位服务类
 * @author: XW
 * @create: 2019-06-18 17:53
 **/

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentMapper departmentMapper;

    @Override
    public List<Department> findAll() {
        return departmentMapper.findAll();
    }

    @Override
    public List<Department> findAllByCity() {
        return departmentMapper.findAll();
    }

    @Override
    public List<Department> findAllByParentDepartId(int parentDepartId) {
        return departmentMapper.findAllByParentId(parentDepartId);
    }

}
