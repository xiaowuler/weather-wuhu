package com.pingchuan.weather.Controller;

import com.pingchuan.weather.DTO.ScoreWarningSignalDTO;
import com.pingchuan.weather.Service.ScoreWarningSignalService;
import com.pingchuan.weather.entity.ScoreWarningSignal;
import org.apache.ibatis.annotations.Arg;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private ScoreWarningSignalService scoreWarningSignalService;

    @PostMapping("/findAllByTimeAndRegionByDepartment")
    public ScoreWarningSignalDTO findAllByTimeAndRegionByDepartment(Date startTime, Date endTime, String warningType, int departmentId){
        return scoreWarningSignalService.findAllByTimeAndRegionByDepartment(startTime, endTime, warningType, departmentId);
    }

    @PostMapping("/findAllByTimeAndRegionByProduct")
    public ScoreWarningSignalDTO findAllByTimeAndRegionByProduct(Date startTime, Date endTime, String warningType, int departmentId){
        return scoreWarningSignalService.findAllByTimeAndRegionByProduct(startTime, endTime, warningType, departmentId);
    }

}
