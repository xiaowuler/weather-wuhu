package com.pingchuan.weather.DTO;

import com.pingchuan.weather.DTO.scorewarningsignal.DepartmentDTO;
import lombok.Data;

import java.util.List;

/**
 * @description: 短临 预报
 * @author: XW
 * @create: 2019-06-17 16:58
 **/
@Data
public class ScoreShortTermDTO {

    private float rainAndSnowRate;

    private String rainAndSnowSample;

    private float rainfallGradeRate;

    private String rainfallGradeSample;

    private float heavyRainAndSnowRate;

    private String heavyRainAndSnowSample;

    private float normalRainRate;

    private String normalRainSample;

    private float minTempOneRate;

    private String minTempOneSample;

    private float minTempTwoRate;

    private String minTempTwoSample;

    private float maxTempOneRate;

    private String maxTempOneSample;

    private float maxTempTwoRate;

    private String maxTempTwoSample;

    private float totalRate;

    private String totalSample;

    private List<DepartmentDTO> departments;
}
