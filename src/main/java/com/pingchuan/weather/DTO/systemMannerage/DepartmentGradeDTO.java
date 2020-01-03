package com.pingchuan.weather.DTO.systemMannerage;

import lombok.Data;

import java.util.List;

@Data
public class DepartmentGradeDTO {

    private Integer id;

    private String name;

    private List<DepartmentGradeDTO> childs;
}
