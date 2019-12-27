package com.pingchuan.weather.service.impl;

import java.util.Date;
import java.util.List;
import java.text.DecimalFormat;

import com.pingchuan.weather.util.WarningCalc;
import com.pingchuan.weather.entity.ScoreNowcasting;
import com.pingchuan.weather.mapper.ScoreNowcastingMapper;
import com.pingchuan.weather.DTO.shortforecast.VariousRate;
import com.pingchuan.weather.service.ScoreNowcastingService;
import com.pingchuan.weather.DTO.shortforecast.ShortImpendingForecastDTO;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class ScoreNowcastingServiceImpl implements ScoreNowcastingService {

    @Autowired
    private ScoreNowcastingMapper scoreNowcastingMapper;

    @Override
    public ShortImpendingForecastDTO findAllByProject(Date startTime, Date endTime, int fcstType, Integer departmentId) {
        List<ScoreNowcasting> scoreNowcastings = scoreNowcastingMapper.findAll(startTime, endTime, fcstType, departmentId);

        WarningCalc warningCalc = GetWarningCalc(scoreNowcastings);
        ShortImpendingForecastDTO forecastDTO = new ShortImpendingForecastDTO();
        forecastDTO.setNowcasting(calculateRate(warningCalc));

        return forecastDTO;
    }

    public WarningCalc GetWarningCalc(List<ScoreNowcasting> scoreNowcastings){
        WarningCalc warningCalc = new WarningCalc();
        if (scoreNowcastings != null){
            for (ScoreNowcasting nowcasting: scoreNowcastings){
                int result = nowcasting.getResult();
                if (result == 1)
                    warningCalc.addCorrectCount();
                else if (result == 2)
                    warningCalc.addEmptyCount();
                else if (result == 3)
                    warningCalc.addMissingCount();
                warningCalc.addTotalCount();
            }
        }
        return warningCalc;
    }

    public VariousRate calculateRate(WarningCalc warningCalc){
        VariousRate rate = new VariousRate();
        int totalCount = warningCalc.getTotalCount();
        if (totalCount != 0){
            int correctCount = warningCalc.getCorrectCount();
            rate.setCorrectRate(Float.parseFloat(new DecimalFormat("0.00").format((float)correctCount/totalCount)));

            int hitCount = correctCount + warningCalc.getEmptyCount();
            if (hitCount != 0)
                rate.setHitRate(Float.parseFloat(new DecimalFormat("0.00").format((float)correctCount/hitCount)));

            rate.setEmptyReportRate(Float.parseFloat(new DecimalFormat("0.00").format((float)warningCalc.getEmptyCount()/totalCount)));
            rate.setMissingReportRate(Float.parseFloat(new DecimalFormat("0.00").format((float)warningCalc.getMissingCount()/totalCount)));
        }
        return rate;
    }
}