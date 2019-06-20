package com.pingchuan.weather.Mapper;

import com.pingchuan.weather.entity.ScoreWarningSignal;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

@Mapper
public interface ScoreWarningSignalMapper {

    List<ScoreWarningSignal> findAllByTime(@Param("startTime") Date startTime, @Param("endTime") Date endTime, @Param("warningType") String warningType, @Param("stationId") int stationId);

}
