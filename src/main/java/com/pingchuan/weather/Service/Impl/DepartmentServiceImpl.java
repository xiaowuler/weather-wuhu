package com.pingchuan.weather.Service.Impl;

import com.pingchuan.weather.Mapper.DepartmentMapper;
import com.pingchuan.weather.Service.DepartmentService;
import com.pingchuan.weather.entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @description: 单位 服务类
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
