package com.pingchuan.weather.service;

import java.util.Date;
import com.pingchuan.weather.DTO.shortforecast.ShortImpendingForecastDTO;

public interface ScoreShortTimeService {

    ShortImpendingForecastDTO findAllByDepartment(Date startTime, Date endTime, String fcstType);

    ShortImpendingForecastDTO findAllByDepartmentId(Date startTime, Date endTime, String fcstType, int departmentId);

    ShortImpendingForecastDTO findAllByProject(Date startTime, Date endTime, String fcstType, Integer departmentId);
}