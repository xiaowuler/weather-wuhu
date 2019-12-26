package com.pingchuan.weather.DTO.shortforecast;

import lombok.Data;
import java.util.List;

@Data
public class ShortImpendingForecastDTO {

    private ShortTimeForecast shortTimeForecast;
    private Nowcasting nowcasting;
    private List<StationDTO> stationDTOs;
}