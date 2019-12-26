package com.pingchuan.weather.service;

import com.pingchuan.weather.entity.ScoreShortTime;

import java.util.Date;
import java.util.List;

public interface ScoreShortTimeService {

    List<ScoreShortTime> findAllByDepartment(Date startTime, Date endTime, String fcstType, String departmentId);
}