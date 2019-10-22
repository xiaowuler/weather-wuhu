package com.pingchuan.weather.service;

import java.util.Date;
import com.pingchuan.weather.DTO.ScoreWarningSignalDTO;

public interface ScoreWarningSignalService {

    ScoreWarningSignalDTO findAllByTimeAndRegionByDepartment(Date startTime, Date endTime, String warningType, int departmentId, Integer childDepartmentId);

    ScoreWarningSignalDTO findAllByTimeAndRegionByProduct(Date startTime, Date endTime, String warningType, int departmentId, Integer childDepartmentId);
}
