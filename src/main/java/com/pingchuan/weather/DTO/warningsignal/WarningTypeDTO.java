package com.pingchuan.weather.DTO.warningsignal;

import lombok.Data;

/**
 * @description: 级别类型
 * @author: XW
 * @create: 2019-06-19 17:16
 **/

@Data
public class WarningTypeDTO {

    // 准确率
    private float correctRate;
    // 命中率
    private float hitRate;
    // 空报率
    private float emptyReportRate;
    // 漏报率
    private float missingReportRate;

    private float t1;

    private float t2;

    private float t3;
}