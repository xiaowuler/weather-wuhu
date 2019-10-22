package com.pingchuan.weather.controller;

import java.util.List;
import com.pingchuan.weather.entity.Department;
import com.pingchuan.weather.service.DepartmentService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @description: 单位 控制类
 * @author: XW
 * @create: 2019-06-18 17:49
 **/

@RestController
@RequestMapping("/Department")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @PostMapping("/findAll")
    public List<Department> findAll(){
        return departmentService.findAllByCity();
    }

    @PostMapping("/findAllByParentDepartId")
    public List<Department> findAllByParentDepartId(int parentDepartId){
        return departmentService.findAllByParentDepartId(parentDepartId);
    }
}