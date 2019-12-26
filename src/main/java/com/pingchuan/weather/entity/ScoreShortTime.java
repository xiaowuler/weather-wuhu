package com.pingchuan.weather.entity;

import lombok.Data;
import java.util.Date;

@Data
public class ScoreShortTime {

    private int userId;
    private Date happendTime;
    private String stationId;
    private String fcstType;
    private String weatherType;
    private int result;
}