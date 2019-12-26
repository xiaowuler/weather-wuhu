package com.pingchuan.weather.controller;

import com.pingchuan.weather.DTO.shortforecast.ShortImpendingForecastDTO;
import com.pingchuan.weather.service.ScoreShortTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

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