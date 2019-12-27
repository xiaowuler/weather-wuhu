package com.pingchuan.weather.service;

import java.util.Date;
import com.pingchuan.weather.DTO.shortforecast.ShortImpendingForecastDTO;

public interface ScoreNowcastingService {

    ShortImpendingForecastDTO findAllByProject(Date startTime, Date endTime, int fcstType, Integer departmentId);
}