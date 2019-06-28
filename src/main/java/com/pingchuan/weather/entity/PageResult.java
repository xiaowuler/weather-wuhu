package com.pingchuan.weather.entity;

import lombok.Data;

import java.util.List;

/**
 * @description: 分页 实体类
 * @author: XW
 * @create: 2019-06-28 10:21
 **/

@Data
public class PageResult<T> {
    private static final long serialVersionUID = 1L;
    private long total;
    private List<T> rows;
}
