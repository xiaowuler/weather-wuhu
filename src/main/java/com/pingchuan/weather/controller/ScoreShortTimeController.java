package com.pingchuan.weather.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import com.pingchuan.weather.service.ScoreShortTimeService;
import com.pingchuan.weather.DTO.shortforecast.ShortImpendingForecastDTO;

@RestController
@RequestMapping("/scoreShortTime")
public class ScoreShortTimeController {

    @Autowired
    private ScoreShortTimeService scoreShortTimeService;

    @PostMapping("/findAllByParentDepartment")
    public ShortImpendingForecastDTO findAllByParentDepartment(Date startTime, Date endTime, String fcstType){
        return scoreShortTimeService.findAllByDepartment(startTime, endTime, fcstType);
    }

    @PostMapping("/findAllByDepartmentId")
    public ShortImpendingForecastDTO findAllByDepartmentId(Date startTime, Date endTime, String fcstType, int departmentId){
        return scoreShortTimeService.findAllByDepartmentId(startTime, endTime, fcstType, departmentId);
    }
}