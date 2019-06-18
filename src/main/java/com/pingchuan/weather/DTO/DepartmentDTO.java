package com.pingchuan.weather.DTO;

import com.pingchuan.weather.entity.Department;
import lombok.Data;

/**
 * @description: 单位 dto
 * @author: XW
 * @create: 2019-06-18 16:19
 **/

@Data
public class DepartmentDTO extends Department {

    private float totalRate;

    private String totalSample;

}
