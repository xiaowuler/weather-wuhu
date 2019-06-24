package com.pingchuan.weather.Service;

import com.pingchuan.weather.DTO.ScoreWarningSignalDTO;

import java.util.Date;

public interface ScoreWarningSignalService {

    ScoreWarningSignalDTO findAllByTimeAndRegionByDepartment(Date startTime, Date endTime, String warningType, int departmentId, int childDepartmentId);

    ScoreWarningSignalDTO findAllByTimeAndRegionByProduct(Date startTime, Date endTime, String warningType, int departmentId, int childDepartmentId);
}
