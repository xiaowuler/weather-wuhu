package com.pingchuan.weather.mapper;

import com.pingchuan.weather.entity.Station;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface StationMapper {

    List<Station> findAllByDepart(@Param("departmentId") int departmentId);

}
