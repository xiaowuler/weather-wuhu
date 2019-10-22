package com.pingchuan.weather.service;

import java.util.Date;
import com.pingchuan.weather.DTO.ScoreShortTermDTO;

public interface ScoreShortTermService {

    ScoreShortTermDTO findAllByTimeAndRegionByProduct(Date startTime, Date endTime, int rescription, int department, int examId);

    ScoreShortTermDTO findAllByTimeAndRegionByDepartment(Date startTime, Date endTime, int fcstHours, int departmentId, int examId);
}
