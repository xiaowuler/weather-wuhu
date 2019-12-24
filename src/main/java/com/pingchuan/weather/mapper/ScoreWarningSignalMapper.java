package com.pingchuan.weather.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;
import com.pingchuan.weather.entity.ScoreWarningSignal;

@Mapper
public interface ScoreWarningSignalMapper {

    List<ScoreWarningSignal> findAllByTime(@Param("startTime") Date startTime, @Param("endTime") Date endTime, @Param("warningType") String warningType, @Param("stationId") int stationId);
    List<ScoreWarningSignal> findWarningType();
}
