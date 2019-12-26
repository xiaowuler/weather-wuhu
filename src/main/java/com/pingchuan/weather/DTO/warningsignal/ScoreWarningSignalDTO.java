package com.pingchuan.weather.DTO.warningsignal;

import lombok.Data;
import java.util.List;

/**
 * @description: 预警信号 DTO
 * @author: XW
 * @create: 2019-06-19 09:54
 **/

@Data
public class ScoreWarningSignalDTO {

    // 蓝色预警
    private WarningTypeDTO blueWarningType;
    // 黄色预警
    private WarningTypeDTO yellowWarningType;
    // 橙色预警
    private WarningTypeDTO orangeWarningType;
    // 红色预警
    private WarningTypeDTO redWarningType;
    // 分级检验
    private WarningTypeDTO levelWarningType;
    // 不分级检验
    private WarningTypeDTO noLevelWarningType;
    // 按单位
    List<DepartmentDTO> departmentDTOS;

}
