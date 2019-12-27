package com.pingchuan.weather.entity;

import lombok.Data;
import java.util.Date;

@Data
public class ScoreNowcasting {

    private int userId;
    private Date issueTime;
    private int stationId;
    private int fcstType;
    private int weatherType;
    private int leadMinutes;
    private int result;
}