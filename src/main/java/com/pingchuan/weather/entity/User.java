package com.pingchuan.weather.entity;

import lombok.Data;

/**
 * @description: 用户实体类
 * @author: XW
 * @create: 2019-06-28 09:48
 **/

@Data
public class User {

    private int id;

    private String name;

    private int departId;

    private String loginName;

    private String loginPwd;

    private int state;

    private String departName;

}
