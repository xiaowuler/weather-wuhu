package com.pingchuan.weather.entity;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @description: 分数查询实体类
 * @author: XW
 * @create: 2019-06-12 11:18
 **/

@Data
public class ScoreShortTerm {

    private int userId;

    private int stationId;

    private Date issueTime;

    private int fcstHours;

    private int rainDay1;

    private int rainDay2;

    private BigDecimal maxTemp;

    private BigDecimal minTemp;

    private int rainLevelKey1;

    private int rainLevelValue1;

    private int rainLevelKey2;

    private int rainLevelValue2;

    private int rainStormKey1;

    private int rainStormValue1;

    private int rainStormKey2;

    private int rainStormValue2;

}
