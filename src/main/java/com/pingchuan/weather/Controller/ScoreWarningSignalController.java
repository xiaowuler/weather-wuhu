package com.pingchuan.weather.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * @description: 预警信号 控制类
 * @author: XW
 * @create: 2019-06-18 17:13
 **/

@RestController
@RequestMapping("/ScoreWarningSignal")
public class ScoreWarningSignalController {

    @PostMapping("/findAllByTimeAndRegionByDepartment")
    public void findAllByTimeAndRegionByDepartment(Date startTime, Date endTime, int fcstHours, int examId, int departmentId){

    }

}
