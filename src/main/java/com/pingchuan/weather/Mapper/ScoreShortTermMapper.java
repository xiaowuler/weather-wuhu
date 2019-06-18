package com.pingchuan.weather.Mapper;

import com.pingchuan.weather.entity.ScoreShortTerm;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

@Mapper
public interface ScoreShortTermMapper {

    List<ScoreShortTerm> findAllByTimeAndRegion();

    List<ScoreShortTerm> findAllByTimeAndRegionByDepartment(@Param("startTime") Date startTime, @Param("endTime") Date endTime, @Param("rescription") int rescription, @Param("stationId") int stationId, @Param("examId") int examId);
}
