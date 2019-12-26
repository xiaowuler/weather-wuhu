package com.pingchuan.weather.DTO.scorewarningsignal;

import lombok.Data;
import com.pingchuan.weather.entity.Department;

/**
 * @description: 单位 dto
 * @author: XW
 * @create: 2019-06-18 16:19
 **/

@Data
public class DepartmentDTO extends Department {

    private float totalRate;  // 总比率
    private String totalSample;  // 总样品
}