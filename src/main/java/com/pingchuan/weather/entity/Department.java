package com.pingchuan.weather.entity;

import lombok.Data;

@Data
public class Department {

    private Integer departId;
    private String departName;
    private Integer parentDepartId;
    private String county;
    private int property;
}