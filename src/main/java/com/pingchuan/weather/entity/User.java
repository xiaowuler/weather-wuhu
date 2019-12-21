package com.pingchuan.weather.entity;

import lombok.Data;

@Data
public class User {

    private Integer id;
    private String name;
    private int departmentId;
    private String loginName;
    private String loginPwd;
    private int state;
    private String province;
    private String city;
    private String county;
    private String departmentName;
}