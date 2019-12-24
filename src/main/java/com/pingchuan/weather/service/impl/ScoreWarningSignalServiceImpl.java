package com.pingchuan.weather.service.impl;

import java.util.*;
import java.math.BigDecimal;
import java.text.DecimalFormat;

import com.pingchuan.weather.DTO.DepartmentDTO;
import com.pingchuan.weather.DTO.WarningTypeDTO;
import com.pingchuan.weather.DTO.ScoreWarningSignalDTO;

import com.pingchuan.weather.mapper.StationMapper;
import com.pingchuan.weather.mapper.DepartmentMapper;
import com.pingchuan.weather.mapper.ScoreWarningSignalMapper;

import com.pingchuan.weather.entity.*;
import com.pingchuan.weather.util.CalcRate;
import com.pingchuan.weather.util.WarningCalc;
import com.pingchuan.weather.service.ScoreWarningSignalService;

import org.springframework.util.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

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
            departments.add(departmentMapper.findOneById(childDepartId));
        }

        for (Department part : departments){
            List<ScoreWarningSignal> scoreWarningSignalList = new ArrayList<>();
            for (Department depart : departmentMapper.findAllByParentId(part.getDepartId())){
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
                departmentDTO.setDepartId(part.getDepartId());
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
                departments = departmentMapper.getAllDepartment();
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
                warningTypeDTO.setT1(Float.parseFloat(new DecimalFormat("0.00").format((float)warningCalc.getCorrectLeadTimeCount()/correctCount)));

            warningTypeDTO.setT2(Float.parseFloat(new DecimalFormat("0.00").format((float)warningCalc.getLeadTimeCount()/totalCount)));
            if ((totalCount - correctCount) != 0)
                warningTypeDTO.setT3(Float.parseFloat(new DecimalFormat("0.00").format((float)warningCalc.getLeadTimeCount()/ (totalCount - correctCount))));
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
        if (value != 0 && value != 4){
            if (value == 1){
                warningTypeCalc.addCorrectLeadTimeCount(leadTime.floatValue());
                warningTypeCalc.addCorrectCount();
                warningCalc.addCorrectLeadTimeCount(leadTime.floatValue());
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

    @Override
    public List<String> findWarningType() {
        List<String> warningTypes = new ArrayList<>();
        List<ScoreWarningSignal> ScoreWarningSignals = scoreWarningSignalMapper.findWarningType();

        for (ScoreWarningSignal signal : ScoreWarningSignals) {
            String code = signal.getWarningType();
            if ("ThunderStormGale".equals(code))
                warningTypes.add(GetWarningType(code, "雷电暴风"));
            else if ("Gale".equals(code))
                warningTypes.add(GetWarningType(code, "大风"));
            else if ("Rainstorm".equals(code))
                warningTypes.add(GetWarningType(code, "暴雨"));
            else if ("Hail".equals(code))
                warningTypes.add(GetWarningType(code, "冰雹"));
            else if ("UnKnow".equals(code))
                warningTypes.add(GetWarningType(code, "未知的"));
            else if("Thunder".equals(code))
                warningTypes.add(GetWarningType(code, "雷"));
            else if ("Fog".equals(code))
                warningTypes.add(GetWarningType(code, "雾"));
            else if ("Typhoon".equals(code))
                warningTypes.add(GetWarningType(code, "台风"));
        }
        return warningTypes;
    }

    public String GetWarningType(String code, String type){
        return String.format("{\"code\": \"%s\", \"type\": \"%s\"}", code, type);
    }
}