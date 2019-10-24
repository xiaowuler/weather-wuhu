package com.pingchuan.weather.controller;

import java.util.List;
import com.pingchuan.weather.entity.Department;
import com.pingchuan.weather.service.DepartmentService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Department")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @PostMapping("/getAllDepartment")
    public List<Department> getAllDepartment(){
        return departmentService.getAllDepartment();
    }

    @PostMapping("/findAllByParentDepartId")
    public List<Department> findAllByParentDepartId(int parentDepartId){
        return departmentService.findAllByParentDepartId(parentDepartId);
    }
}