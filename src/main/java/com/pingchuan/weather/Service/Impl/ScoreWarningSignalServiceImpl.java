package com.pingchuan.weather.Service.Impl;

import com.pingchuan.weather.DTO.DepartmentDTO;
import com.pingchuan.weather.DTO.ScoreWarningSignalDTO;
import com.pingchuan.weather.DTO.WarningTypeDTO;
import com.pingchuan.weather.Mapper.DepartmentMapper;
import com.pingchuan.weather.Mapper.ScoreWarningSignalMapper;
import com.pingchuan.weather.Mapper.StationMapper;
import com.pingchuan.weather.Service.ScoreWarningSignalService;
import com.pingchuan.weather.Util.CalcRate;
import com.pingchuan.weather.Util.WarningCalc;
import com.pingchuan.weather.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @description: 预警信号 服务类
 * @author: XW
 * @create: 2019-06-19 09:57
 **/

@Service
@Transactional
public class ScoreWarningSignalServiceImpl implements ScoreWarningSignalService {

    @Autowired
    private ScoreWarningSignalMapper scoreWarningSignalMapper;

    @Autowired
    private DepartmentMapper departmentMapper;

    @Autowired
    private StationMapper stationMapper;

    @Override
    public ScoreWarningSignalDTO findAllByTimeAndRegionByDepartment(Date startTime, Date endTime, String warningType, int departmentId, Integer childDepartId) {

        List<DepartmentDTO> departmentDTOS = new ArrayList<>();
        List<Department> departments;

        if (StringUtils.isEmpty(childDepartId)){
            if (departmentId == 58000){
                departments = departmentMapper.findAllCity();
            }else {
                departments = departmentMapper.findAllByParentId(departmentId);
                departments.add(departmentMapper.findOneById(departmentId));
            }
        }else {
            departments = new ArrayList<>();
            departments.add(departmentMapper.findOneById(departmentId));
        }

        for (Department part : departments){
            List<ScoreWarningSignal> scoreWarningSignalList = new ArrayList<>();
                for (Department depart : departmentMapper.findAllByParentId(part.getParentDepartId())){
                    List<ScoreWarningSignal> scoreWarningSignals = scoreWarningSignalMapper.findAllByTime(startTime, endTime, warningType, depart.getDepartId());
                    scoreWarningSignalList.addAll(scoreWarningSignals);
                }
                scoreWarningSignalList.addAll(scoreWarningSignalMapper.findAllByTime(startTime, endTime, warningType, part.getDepartId()));

            if (scoreWarningSignalList.size() == 0)
                continue;

            CalcRate calcRate = new CalcRate();
            for (ScoreWarningSignal scoreWarningSignal : scoreWarningSignalList){
                int gradeValueClass = scoreWarningSignal.getGradeValueClass();
                if (gradeValueClass != 0 && gradeValueClass != 4){
                    if (gradeValueClass == 1)
                        calcRate.addSuccessCount();
                    calcRate.addCount();
                }

                int gradeValueNoClass = scoreWarningSignal.getGradeValueNoClass();
                if (gradeValueNoClass != 0 && gradeValueNoClass != 4){
                    if (gradeValueNoClass == 1)
                        calcRate.addSuccessCount();
                    calcRate.addCount();
                }
            }

            if (calcRate.getCount() > 0)
            {
                DepartmentDTO departmentDTO = new DepartmentDTO();
                departmentDTO.setDepartName(part.getDepartName());
                departmentDTO.setTotalRate(Float.parseFloat(new DecimalFormat("0.00").format((float)calcRate.getSuccessCount()/calcRate.getCount())));
                departmentDTO.setTotalSample(calcRate.getTotalSample());
                departmentDTO.setCounty(part.getCounty());
                departmentDTOS.add(departmentDTO);
            }
        }

        ScoreWarningSignalDTO scoreWarningSignalDTO = new ScoreWarningSignalDTO();
        scoreWarningSignalDTO.setDepartmentDTOS(departmentDTOS);


        return scoreWarningSignalDTO;
    }

    @Override
    public ScoreWarningSignalDTO findAllByTimeAndRegionByProduct(Date startTime, Date endTime, String warningType, int departmentId, Integer childDepartmentId) {
        List<ScoreWarningSignal> scoreWarningSignalList = new ArrayList<>();
        List<Department> departments;

        if (StringUtils.isEmpty(childDepartmentId)){
            if (departmentId == 58000){
                departments = departmentMapper.findAll();
            }else {
                departments = departmentMapper.findAllByParentId(departmentId);
                departments.add(departmentMapper.findOneById(departmentId));
            }
        }else {
            departments = new ArrayList<>();
            departments.add(departmentMapper.findOneById(departmentId));
        }

        for (Department part : departments){
            List<ScoreWarningSignal> scoreWarningSignals = scoreWarningSignalMapper.findAllByTime(startTime, endTime, warningType, part.getDepartId());
            scoreWarningSignalList.addAll(scoreWarningSignals);
        }

        if (scoreWarningSignalList.size() == 0)
            return null;

        WarningCalc yellowWarningCalc = new WarningCalc();
        WarningCalc blueWarningCalc = new WarningCalc();
        WarningCalc orangeWarningCalc = new WarningCalc();
        WarningCalc redWarningCalc = new WarningCalc();
        WarningCalc levelWarningCalc = new WarningCalc();
        WarningCalc noLevelWarningCalc = new WarningCalc();

        for (ScoreWarningSignal scoreWarningSignal : scoreWarningSignalList){
            if (scoreWarningSignal.getWarningLevelClass() == 1)
                SetWarningCalc(scoreWarningSignal, blueWarningCalc, levelWarningCalc, noLevelWarningCalc);
            else if (scoreWarningSignal.getWarningLevelClass() == 2)
                SetWarningCalc(scoreWarningSignal, yellowWarningCalc, levelWarningCalc, noLevelWarningCalc);
            else if (scoreWarningSignal.getWarningLevelClass() == 3)
                SetWarningCalc(scoreWarningSignal, orangeWarningCalc, levelWarningCalc, noLevelWarningCalc);
            else if (scoreWarningSignal.getWarningLevelClass() == 4)
                SetWarningCalc(scoreWarningSignal, redWarningCalc, levelWarningCalc, noLevelWarningCalc);
        }

        ScoreWarningSignalDTO scoreWarningSignalDTO = new ScoreWarningSignalDTO();
        scoreWarningSignalDTO.setBlueWarningType(calcRate(blueWarningCalc));
        scoreWarningSignalDTO.setYellowWarningType(calcRate(yellowWarningCalc));
        scoreWarningSignalDTO.setOrangeWarningType(calcRate(orangeWarningCalc));
        scoreWarningSignalDTO.setRedWarningType(calcRate(redWarningCalc));
        scoreWarningSignalDTO.setLevelWarningType(calcRate(levelWarningCalc));
        scoreWarningSignalDTO.setNoLevelWarningType(calcRate(noLevelWarningCalc));

        return scoreWarningSignalDTO;
    }

    private WarningTypeDTO calcRate(WarningCalc warningCalc){
        WarningTypeDTO warningTypeDTO = new WarningTypeDTO();
        int totalCount = warningCalc.getTotalCount();
        if (totalCount != 0){
            int correctCount = warningCalc.getCorrectCount();
            warningTypeDTO.setCorrectRate(Float.parseFloat(new DecimalFormat("0.00").format((float)correctCount/totalCount)));
            int hitCount = warningCalc.getCorrectCount() + warningCalc.getEmptyCount();
            if (hitCount != 0)
                warningTypeDTO.setHitRate(Float.parseFloat(new DecimalFormat("0.00").format((float)correctCount/hitCount)));

            warningTypeDTO.setEmptyReportRate(Float.parseFloat(new DecimalFormat("0.00").format((float)warningCalc.getEmptyCount()/totalCount)));
            warningTypeDTO.setMissingReportRate(Float.parseFloat(new DecimalFormat("0.00").format((float)warningCalc.getMissingCount()/totalCount)));
            if (correctCount != 0)
                warningTypeDTO.setT1(Float.parseFloat(new DecimalFormat("0.00").format((float)warningCalc.getLeadTimeCount()/correctCount)));
            warningTypeDTO.setT3(Float.parseFloat(new DecimalFormat("0.00").format((float)warningCalc.getLeadTimeCount()/totalCount)));
        }
        return warningTypeDTO;
    }

    private void SetWarningCalc(ScoreWarningSignal scoreWarningSignal, WarningCalc warningTypeCalc, WarningCalc warningCalc, WarningCalc warningNoCalc){
        int gradeValueClass = scoreWarningSignal.getGradeValueClass();
        SetWarningCalcType(warningTypeCalc, warningCalc, gradeValueClass, scoreWarningSignal.getLeadTimeClass());

        int gradeValueNoClass = scoreWarningSignal.getGradeValueNoClass();
        SetWarningCalcType(warningTypeCalc, warningNoCalc, gradeValueNoClass, scoreWarningSignal.getLeadTimeNoClass());
    }

    private void SetWarningCalcType(WarningCalc warningTypeCalc, WarningCalc warningCalc, int value, BigDecimal leadTime){
        if (value != 0 && value !=4){
            if (value == 1){
                warningTypeCalc.addCorrectCount();
                warningCalc.addCorrectCount();
            }

            if (value == 2){
                warningCalc.addEmptyCount();
                warningTypeCalc.addEmptyCount();
            }

            if (value == 3){
                warningTypeCalc.addMissingCount();
                warningCalc.addMissingCount();
            }

            warningTypeCalc.addTotalCount();
            warningTypeCalc.addLeadTimeCount(leadTime.floatValue());
            warningCalc.addTotalCount();
            warningCalc.addLeadTimeCount(leadTime.floatValue());
        }
    }

}
