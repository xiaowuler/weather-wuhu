package com.pingchuan.weather.service.impl;

import com.pingchuan.weather.entity.ScoreShortTime;
import com.pingchuan.weather.mapper.ScoreShortTimeMapper;
import com.pingchuan.weather.service.ScoreShortTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ScoreShortTimeServiceImpl implements ScoreShortTimeService {

    @Autowired
    private ScoreShortTimeMapper scoreShortTimeMapper;

    @Override
    public List<ScoreShortTime> findAllByDepartment(Date startTime, Date endTime, String fcstType, String departmentId) {



        return null;
    }
}