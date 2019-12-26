package com.pingchuan.weather.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.pingchuan.weather.entity.ScoreShortTime;

@Mapper
public interface ScoreShortTimeMapper {

    List<ScoreShortTime> findAll(@Param("startTime") Date startTime,  @Param("endTime") Date endTime, @Param("fcstType") String fcstType, @Param("stationId") String stationId);

    List<ScoreShortTime> findAllByDepartmentId(@Param("startTime") Date startTime, @Param("endTime") Date endTime, @Param("fcstType") String fcstType, @Param("departmentId") int departmentId);
}