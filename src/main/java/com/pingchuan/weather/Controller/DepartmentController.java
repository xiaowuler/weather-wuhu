package com.pingchuan.weather.Controller;

import com.pingchuan.weather.Service.DepartmentService;
import com.pingchuan.weather.entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @PostMapping("/findAllByCity")
    public List<Department> findAllByCity(){
        return departmentService.findAllByCity();
    }

}
