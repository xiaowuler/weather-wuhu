package com.pingchuan.weather.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public Map<String,Map<String,List<String>>> getAllDepartment(){
        Map<String,Map<String,List<String>>> maps=new HashMap<>();
        for (Department province: departmentService.findAllProvince()) {
            Map<String,List<String>> map=new HashMap<>();
            for (Department city:departmentService.findAllCity()) {
                List<String> list = new ArrayList<>();
                for (Department county:departmentService.findAllCounty(city.getDepartId())) {
                    list.add(county.getDepartName());
                }
                if(!map.containsKey(city.getDepartName()))
                    map.put(city.getDepartName(),list);

            }
            if(!maps.containsKey(province.getDepartName()))
                maps.put(province.getDepartName(),map);

        }
        return maps;
    }

    @PostMapping("/findAllByParentDepartId")
    public List<Department> findAllByParentDepartId(int parentDepartId){
        return departmentService.findAllByParentDepartId(parentDepartId);
    }
}