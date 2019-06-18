package com.pingchuan.weather.entity;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @description: 预警信号 实体类
 * @author: XW
 * @create: 2019-06-18 17:14
 **/

@Data
public class ScoreWarningSignal {

    private String departmentId;

    private Date issueTime;

    private byte isWarningSignal;

    private Date operationTime;

    private String warningAction;

    private String warningType;

    private int warningLevelClass;

    private int gradeValueClass;

    private BigDecimal leadTimeClass;

    private int gradeValueNoClass;

    private BigDecimal leadTimeNoClass;

    private byte isOverTime;

}
