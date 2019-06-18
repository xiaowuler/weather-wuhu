package com.pingchuan.weather.Controller;

import com.pingchuan.weather.DTO.ScoreShortTermDTO;
import com.pingchuan.weather.Service.ScoreShortTermService;
import com.pingchuan.weather.entity.ScoreShortTerm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

/**
 * @description: 分数查询控制层
 * @author: XW
 * @create: 2019-06-12 11:34
 **/

@RestController
@RequestMapping("/ScoreShortTerm")
public class ScoreShortTermController {
    
    @Autowired
    private ScoreShortTermService scoreShortTermService;
    
    @PostMapping("/findAllByTimeAndRegionByDepartment")
    public ScoreShortTermDTO findAllByTimeAndRegionByDepartment(Date startTime, Date endTime, int fcstHours, int examId, int departmentId){
        return scoreShortTermService.findAllByTimeAndRegionByDepartment(startTime, endTime, fcstHours, departmentId, examId);
    }

    @PostMapping("/findAllByTimeAndRegionByProject")
    public ScoreShortTermDTO findAllByTimeAndRegionByProject(Date startTime, Date endTime, int fcstHours, int examId, int departmentId){
        return scoreShortTermService.findAllByTimeAndRegionByProduct(startTime, endTime, fcstHours, departmentId, examId);
    }
}
