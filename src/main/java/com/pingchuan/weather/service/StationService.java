package com.pingchuan.weather.service;

import com.pingchuan.weather.entity.Station;

import java.util.List;

public interface StationService {

    List<Station> findParentStations();
}