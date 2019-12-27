package com.pingchuan.weather.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import com.pingchuan.weather.service.ScoreNowcastingService;
import com.pingchuan.weather.DTO.shortforecast.ShortImpendingForecastDTO;

@RestController
@RequestMapping("/scoreNowcasting")
public class ScoreNowcastingController {

    @Autowired
    private ScoreNowcastingService scoreNowcastingService;

    @PostMapping("/findAllByProject")
    public ShortImpendingForecastDTO findAllByProject(Date startTime, Date endTime, int fcstType, Integer departmentId){
        return scoreNowcastingService.findAllByProject(startTime, endTime, fcstType, departmentId);
    }
}