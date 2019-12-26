package com.pingchuan.weather.service.impl;

import java.util.List;
import java.util.Date;
import java.util.ArrayList;
import java.text.DecimalFormat;

import com.pingchuan.weather.util.CalcRate;
import com.pingchuan.weather.entity.Station;
import com.pingchuan.weather.mapper.StationMapper;
import com.pingchuan.weather.DTO.shortforecast.StationDTO;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.pingchuan.weather.entity.ScoreShortTime;
import com.pingchuan.weather.mapper.ScoreShortTimeMapper;
import com.pingchuan.weather.service.ScoreShortTimeService;
import com.pingchuan.weather.DTO.shortforecast.ShortImpendingForecastDTO;

@Service
public class ScoreShortTimeServiceImpl implements ScoreShortTimeService {

    @Autowired
    private StationMapper stationMapper;

    @Autowired
    private ScoreShortTimeMapper scoreShortTimeMapper;

    @Override
    public ShortImpendingForecastDTO findAllByDepartment(Date startTime, Date endTime, String fcstType) {
        List<StationDTO> stationDTOS = new ArrayList<>();
        List<Station> stations = stationMapper.findParentStations();

        for (Station station: stations) {
            List<ScoreShortTime> scoreShortTimes = new ArrayList<>();
            scoreShortTimes.addAll(scoreShortTimeMapper.findAll(startTime, endTime, fcstType, String.valueOf(station.getStationCode())));
            if (scoreShortTimes.size() == 0)
                continue;

            CalcRate calcRate = new CalcRate();
            for (ScoreShortTime scoreShortTime: scoreShortTimes) {
                if (scoreShortTime.getResult() == 1)
                    calcRate.addSuccessCount();
                calcRate.addCount();
            }

            if (calcRate.getCount() > 0){
                StationDTO stationDTO = new StationDTO();
                stationDTO.setStationName(station.getStationName());
                stationDTO.setTotalRate(Float.parseFloat(new DecimalFormat("0.00").format((float)calcRate.getSuccessCount()/calcRate.getCount())));
                stationDTO.setTotalSample(calcRate.getTotalSample());
                stationDTOS.add(stationDTO);
            }
        }

        ShortImpendingForecastDTO forecastDTO = new ShortImpendingForecastDTO();
        forecastDTO.setStationDTOs(stationDTOS);

        return forecastDTO;
    }

    @Override
    public ShortImpendingForecastDTO findAllByDepartmentId(Date startTime, Date endTime, String fcstType, int departmentId) {
        List<StationDTO> stationDTOS = new ArrayList<>();
        List<Station> stations = stationMapper.findStationByDepartmentId(departmentId);
        List<ScoreShortTime> scoreShortTimes = scoreShortTimeMapper.findAllByDepartmentId(startTime, endTime, fcstType, departmentId);

        for (Station station: stations) {
            List<ScoreShortTime> stationShortTimes = new ArrayList<>();
            for (ScoreShortTime shortTime: scoreShortTimes){
                if (String.valueOf(station.getStationCode()).equals(shortTime.getStationId())){
                    stationShortTimes.add(shortTime);
                }
            }
            if (stationShortTimes.size() == 0)
                continue;

            CalcRate calcRate = new CalcRate();
            for (ScoreShortTime shortTime: stationShortTimes){
                if (shortTime.getResult() == 1)
                    calcRate.addSuccessCount();
                calcRate.addCount();
            }

            if (calcRate.getCount() > 0){
                StationDTO stationDTO = new StationDTO();
                stationDTO.setStationName(station.getStationName());
                stationDTO.setTotalRate(Float.parseFloat(new DecimalFormat("0.00").format((float)calcRate.getSuccessCount()/calcRate.getCount())));
                stationDTO.setTotalSample(calcRate.getTotalSample());
                stationDTOS.add(stationDTO);
            }
        }

        ShortImpendingForecastDTO forecastDTO = new ShortImpendingForecastDTO();
        forecastDTO.setStationDTOs(stationDTOS);

        return  forecastDTO;
    }
}