package com.pingchuan.weather.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;
import com.pingchuan.weather.entity.ScoreShortTerm;

@Mapper
public interface ScoreShortTermMapper {

    List<ScoreShortTerm> findAllByTimeAndRegion();

    List<ScoreShortTerm> findAllByTimeAndRegionByDepartment(@Param("startTime") Date startTime, @Param("endTime") Date endTime, @Param("rescription") int rescription, @Param("stationId") int stationId, @Param("examId") int examId);
}
