package com.pingchuan.weather.DTO;

import lombok.Data;

import java.util.List;

/**
 * @description: 预警信号 DTO
 * @author: XW
 * @create: 2019-06-19 09:54
 **/

@Data
public class ScoreWarningSignalDTO {

    private WarningTypeDTO blueWarningType;

    private WarningTypeDTO yellowWarningType;

    private WarningTypeDTO orangeWarningType;

    private WarningTypeDTO redWarningType;

    private WarningTypeDTO levelWarningType;

    private WarningTypeDTO noLevelWarningType;

    List<DepartmentDTO> departmentDTOS;

}
