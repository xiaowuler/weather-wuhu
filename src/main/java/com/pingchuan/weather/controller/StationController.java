package com.pingchuan.weather.controller;

import java.util.List;
import com.pingchuan.weather.entity.Station;
import com.pingchuan.weather.service.StationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/station")
public class StationController {

    @Autowired
    private StationService stationService;

    @PostMapping("/findParentStations")
    public List<Station> findParentStations(){
        return stationService.findParentStations();
    }
}