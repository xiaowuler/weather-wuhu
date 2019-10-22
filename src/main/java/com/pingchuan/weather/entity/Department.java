package com.pingchuan.weather.entity;

import lombok.Data;

/**
 * @description: 单位类
 * @author: XW
 * @create: 2019-06-17 13:58
 **/

@Data
public class Department {
    // 单位Id
    private Integer departId;
    // 单位名称
    private String departName;
    // 父单位Id
    private Integer parentDepartId;
    // 县
    private String county;
    // 单位属性
    private int property;
}
