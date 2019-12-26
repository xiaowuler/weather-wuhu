package com.pingchuan.weather.DTO.shortimpendingforecast;

import lombok.Data;
import com.pingchuan.weather.entity.Station;

@Data
public class StationDTO extends Station {

    private float totalRate;
    private String totalSample;
}