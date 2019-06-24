package com.pingchuan.weather.entity;

import lombok.Data;

/**
 * @description: 单位类
 * @author: XW
 * @create: 2019-06-17 13:58
 **/

@Data
public class Department {

    private Integer departId;

    private String departName;

    private Integer parentDepartId;

    private String county;

    private int property;

}
