package com.pingchuan.weather.entity;

import lombok.Data;

/**
 * @description: 站点信息类
 * @author: XW
 * @create: 2019-06-17 14:00
 **/

@Data
public class Station {

    private int departmentId;
    private int stationCode;
    private String stationName;
    private float longitude;
    private float latitude;
    private float altitude;
    private String county;
    private int orderId;
}