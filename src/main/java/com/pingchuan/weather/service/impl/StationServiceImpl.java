package com.pingchuan.weather.service.impl;

import java.util.List;
import com.pingchuan.weather.entity.Station;
import com.pingchuan.weather.mapper.StationMapper;
import com.pingchuan.weather.service.StationService;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class StationServiceImpl implements StationService {

    @Autowired
    private StationMapper stationMapper;

    @Override
    public List<Station> findParentStations() {
        return stationMapper.findParentStations();
    }
}
