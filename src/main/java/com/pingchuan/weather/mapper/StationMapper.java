package com.pingchuan.weather.mapper;

import java.util.List;
import com.pingchuan.weather.entity.Station;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StationMapper {

    List<Station> findParentStations();

    List<Station> findStationByDepartmentId(@Param("departmentId") int departmentId);
}
