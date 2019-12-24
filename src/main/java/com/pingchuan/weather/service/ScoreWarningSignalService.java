package com.pingchuan.weather.service;

import java.util.Date;
import java.util.List;

import com.pingchuan.weather.DTO.ScoreWarningSignalDTO;
import com.pingchuan.weather.entity.ScoreWarningSignal;

public interface ScoreWarningSignalService {

    ScoreWarningSignalDTO findAllByTimeAndRegionByDepartment(Date startTime, Date endTime, String warningType, int departmentId, Integer childDepartmentId);

    ScoreWarningSignalDTO findAllByTimeAndRegionByProduct(Date startTime, Date endTime, String warningType, int departmentId, Integer childDepartmentId);

    List<String> findWarningType();
}
