package com.pingchuan.weather.DTO;

import lombok.Data;

/**
 * @description: 级别类型
 * @author: XW
 * @create: 2019-06-19 17:16
 **/

@Data
public class WarningTypeDTO {

    private float correctRate;

    private float hitRate;

    private float emptyReportRate;

    private float missingReportRate;

    private float t1;

    private float t2;

    private float t3;

}
