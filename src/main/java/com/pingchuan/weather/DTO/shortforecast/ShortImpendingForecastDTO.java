package com.pingchuan.weather.DTO.shortforecast;

import lombok.Data;
import java.util.List;

@Data
public class ShortImpendingForecastDTO {

    private VariousRate shortTimeForecast;
    private VariousRate nowcasting;
    private List<StationDTO> stationDTOs;
}