package com.pingchuan.weather.entity;

import lombok.Data;
import java.util.Date;
import java.math.BigDecimal;

/**
 * @description: 预警信号 实体类
 * @author: XW
 * @create: 2019-06-18 17:14
 **/

@Data
public class ScoreWarningSignal {
    // 单位Id
    private String departmentId;
    // 发布时间
    private Date issueTime;
    // 是否是预警信号
    private byte isWarningSignal;
    // 操作时间
    private Date operationTime;
    // 预警行为
    private String warningAction;
    // 预警类型
    private String warningType;
    // 分级预警等级
    private int warningLevelClass;
    // 分级值
    private int gradeValueClass;
    // 分级时间提前量
    private BigDecimal leadTimeClass;
    // 不分级值
    private int gradeValueNoClass;
    // 不分级时间提前量
    private BigDecimal leadTimeNoClass;
    // 解除变更是否及时
    private byte isOverTime;
}