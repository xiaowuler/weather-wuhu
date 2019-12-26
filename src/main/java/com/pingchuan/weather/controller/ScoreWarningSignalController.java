package com.pingchuan.weather.controller;

import java.util.Date;
import java.util.List;

import com.pingchuan.weather.DTO.warningsignal.ScoreWarningSignalDTO;
import com.pingchuan.weather.service.ScoreWarningSignalService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ScoreWarningSignal")
public class ScoreWarningSignalController {

    @Autowired
    private ScoreWarningSignalService scoreWarningSignalService;

    @PostMapping("/findAllByTimeAndRegionByProduct")
    public ScoreWarningSignalDTO findAllByTimeAndRegionByProduct(Date startTime, Date endTime, String warningType, int departmentId, Integer childDepartmentId){
        return scoreWarningSignalService.findAllByTimeAndRegionByProduct(startTime, endTime, warningType, departmentId, childDepartmentId);
    }

    @PostMapping("/findAllByTimeAndRegionByDepartment")
    public ScoreWarningSignalDTO findAllByTimeAndRegionByDepartment(Date startTime, Date endTime, String warningType, int departmentId, Integer childDepartmentId){
        return scoreWarningSignalService.findAllByTimeAndRegionByDepartment(startTime, endTime, warningType, departmentId, childDepartmentId);
    }

    @PostMapping("/findWaringType")
    public List<String> findWarningType(){
        return scoreWarningSignalService.findWarningType();
    }
}