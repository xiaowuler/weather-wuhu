package com.pingchuan.weather.DTO.shortforecast;

import lombok.Data;

@Data
public class VariousRate {

    private float correctRate;
    private float hitRate;
    private float emptyReportRate;
    private float missingReportRate;
    private float timeAdvance;
}