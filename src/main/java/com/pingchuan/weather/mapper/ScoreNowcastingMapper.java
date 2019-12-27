package com.pingchuan.weather.mapper;

import java.util.List;
import java.util.Date;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.pingchuan.weather.entity.ScoreNowcasting;

@Mapper
public interface ScoreNowcastingMapper {

    List<ScoreNowcasting> findAll(@Param("startTime")Date startTime, @Param("endTime") Date endTime, @Param("fcstType") int fcstType, @Param("departmentId") Integer departmentId);
}