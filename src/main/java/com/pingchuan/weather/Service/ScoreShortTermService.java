package com.pingchuan.weather.Service;

import com.pingchuan.weather.DTO.ScoreShortTermDTO;
import com.pingchuan.weather.entity.ScoreShortTerm;

import java.util.Date;
import java.util.List;

public interface ScoreShortTermService {

    ScoreShortTermDTO findAllByTimeAndRegionByProduct(Date startTime, Date endTime, int rescription, int department, int examId);

    ScoreShortTermDTO findAllByTimeAndRegionByDepartment(Date startTime, Date endTime, int fcstHours, int departmentId, int examId);
}
