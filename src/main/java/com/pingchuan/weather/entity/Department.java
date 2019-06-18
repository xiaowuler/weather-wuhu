package com.pingchuan.weather.entity;

import lombok.Data;

/**
 * @description: 单位类
 * @author: XW
 * @create: 2019-06-17 13:58
 **/

@Data
public class Department {

    private Integer id;

    private String name;

    private Integer parentId;

    private Integer orderId;

    private int property;

    private String timeClass;
}
