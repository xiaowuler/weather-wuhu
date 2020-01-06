package com.pingchuan.weather.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.pingchuan.weather.DTO.systemMannerage.DepartmentGradeDTO;
import com.pingchuan.weather.DTO.warningsignal.DepartmentDTO;
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
    public List<DepartmentGradeDTO> getAllDepartment(){
       List<DepartmentGradeDTO> list=new ArrayList<>();
        DepartmentGradeDTO departs=new DepartmentGradeDTO();
        departs.setId(-1);
        departs.setText("全部单位");
        list.add(departs);
       for(Department province:departmentService.findAllProvince()){
           DepartmentGradeDTO depart=new DepartmentGradeDTO();
           depart.setId(province.getDepartId());
           depart.setText(province.getDepartName());
           List<DepartmentGradeDTO> cities=new ArrayList<>();
           for (Department city:departmentService.findAllCity()){
               DepartmentGradeDTO cityDto=new DepartmentGradeDTO();
               cityDto.setText(city.getDepartName());
               cityDto.setId(city.getDepartId());
               cities.add(cityDto);
               depart.setChildren(cities);
               List<DepartmentGradeDTO> counties=new ArrayList<>();
               for (Department county:departmentService.findAllCounty(city.getDepartId())) {
                   DepartmentGradeDTO countyDto=new DepartmentGradeDTO();
                   countyDto.setId(county.getDepartId());
                   countyDto.setText(county.getDepartName());
                   counties.add(countyDto);
                   cityDto.setChildren(counties);
               }
           }
           list.add(depart);
       }

       return list;
    }
    @PostMapping("/findAllByParentDepartId")
    public List<Department> findAllByParentDepartId(int parentDepartId){
        return departmentService.findAllByParentDepartId(parentDepartId);
    }
}