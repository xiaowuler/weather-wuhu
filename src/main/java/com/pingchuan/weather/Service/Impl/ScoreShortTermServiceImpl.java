package com.pingchuan.weather.Service.Impl;

import com.pingchuan.weather.DTO.DepartmentDTO;
import com.pingchuan.weather.DTO.ScoreShortTermDTO;
import com.pingchuan.weather.Mapper.DepartmentMapper;
import com.pingchuan.weather.Mapper.ScoreShortTermMapper;
import com.pingchuan.weather.Mapper.StationMapper;
import com.pingchuan.weather.Service.ScoreShortTermService;
import com.pingchuan.weather.Util.CalcRate;
import com.pingchuan.weather.entity.Department;
import com.pingchuan.weather.entity.ScoreShortTerm;
import com.pingchuan.weather.entity.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @description: 短临预报查询
 * @author: XW
 * @create: 2019-06-12 11:32
 **/

@Service
@Transactional
public class ScoreShortTermServiceImpl implements ScoreShortTermService {

    @Autowired
    private ScoreShortTermMapper scoreShortTermMapper;

    @Autowired
    private DepartmentMapper departmentMapper;

    @Autowired
    private StationMapper stationMapper;

    @Override
    public ScoreShortTermDTO findAllByTimeAndRegionByProduct(Date startTime, Date endTime, int rescription, int departmentId, int examId) {

        List<ScoreShortTerm> scoreShortTermList = new ArrayList<>();
        List<Department> departments;

        if (departmentId == 58000){
            departments = departmentMapper.findAll();
        }else {
            departments = departmentMapper.findAllByParentId(departmentId);
            departments.add(departmentMapper.findOneById(departmentId));
        }

        for (Department part : departments){
                List<ScoreShortTerm> scoreShortTerms = scoreShortTermMapper.findAllByTimeAndRegionByDepartment(startTime, endTime, rescription, part.getDepartId(), examId);
                scoreShortTermList.addAll(scoreShortTerms);
        }

        if (scoreShortTermList.size() == 0)
            return null;

        //晴雨雪
        CalcRate rainAndSnowCalc = new CalcRate();
        //降雨分级
        CalcRate rainfallGradeCalc = new CalcRate();
        //暴雨雪
        CalcRate heavyRainAndSnowCalc = new CalcRate();
        //一般性降水
        CalcRate normalRainCalc = new CalcRate();
        //低温小于等于1
        CalcRate minTempOneCalc = new CalcRate();
        //低温小于等于2
        CalcRate minTempTwoCalc = new CalcRate();
        //高温小于等于1
        CalcRate maxTempOneCalc = new CalcRate();
        //高温小于等于2
        CalcRate maxTempTwoCalc = new CalcRate();

        for (ScoreShortTerm scoreShortTerm : scoreShortTermList){
            //晴雨雪
            rainAndSnowCalc = calcRate(rainAndSnowCalc, scoreShortTerm.getRainDay1());
            rainAndSnowCalc = calcRate(rainAndSnowCalc, scoreShortTerm.getRainDay2());
            //降雨分级
            rainfallGradeCalc = calcRate(rainfallGradeCalc, scoreShortTerm.getRainLevelValue1());
            rainfallGradeCalc = calcRate(rainfallGradeCalc, scoreShortTerm.getRainLevelValue2());

            //暴雨雪 和 一般性降水
            if (scoreShortTerm.getRainStormKey1() >= 30){
                heavyRainAndSnowCalc = calcRate(heavyRainAndSnowCalc, scoreShortTerm.getRainStormValue1());
            }else if (scoreShortTerm.getRainStormKey1() >= 20 && scoreShortTerm.getRainStormKey1() <= 30){
                normalRainCalc = calcRate(normalRainCalc, scoreShortTerm.getRainStormValue1());
            }

            if (scoreShortTerm.getRainStormKey2() >= 30){
                heavyRainAndSnowCalc = calcRate(heavyRainAndSnowCalc, scoreShortTerm.getRainStormValue2());
            }else if (scoreShortTerm.getRainStormKey2() >= 20 && scoreShortTerm.getRainStormKey2() <= 30){
                normalRainCalc = calcRate(normalRainCalc, scoreShortTerm.getRainStormValue2());
            }

            //高温误差
            if(Math.abs(scoreShortTerm.getMaxTemp().doubleValue()) <= 2){
                if (Math.abs(scoreShortTerm.getMaxTemp().doubleValue()) <= 1)
                    maxTempOneCalc.addSuccessCount();
                maxTempTwoCalc.addSuccessCount();
            }
            maxTempOneCalc.addCount();
            maxTempTwoCalc.addCount();

            //低温误差
            if (Math.abs(scoreShortTerm.getMinTemp().doubleValue()) <=2){
                if (Math.abs(scoreShortTerm.getMinTemp().doubleValue()) <= 1)
                    minTempOneCalc.addSuccessCount();
                minTempTwoCalc.addSuccessCount();
            }
            minTempOneCalc.addCount();
            minTempTwoCalc.addCount();
        }

        ScoreShortTermDTO scoreShortTermDTO = new ScoreShortTermDTO();
        CalcRate totalCalcRate = new CalcRate();
        scoreShortTermDTO.setRainAndSnowRate(calc(rainAndSnowCalc, totalCalcRate));
        scoreShortTermDTO.setRainAndSnowSample(rainAndSnowCalc.getTotalSample());

        scoreShortTermDTO.setHeavyRainAndSnowRate(calc(heavyRainAndSnowCalc, totalCalcRate));
        scoreShortTermDTO.setHeavyRainAndSnowSample(heavyRainAndSnowCalc.getTotalSample());

        scoreShortTermDTO.setRainfallGradeRate(calc(rainfallGradeCalc, totalCalcRate));
        scoreShortTermDTO.setRainfallGradeSample(rainfallGradeCalc.getTotalSample());

        scoreShortTermDTO.setNormalRainRate(calc(normalRainCalc, totalCalcRate));
        scoreShortTermDTO.setNormalRainSample(normalRainCalc.getTotalSample());

        scoreShortTermDTO.setMinTempOneRate(calc(minTempOneCalc, totalCalcRate));
        scoreShortTermDTO.setMinTempOneSample(minTempOneCalc.getTotalSample());

        scoreShortTermDTO.setMinTempTwoRate(calc(minTempTwoCalc, totalCalcRate));
        scoreShortTermDTO.setMinTempTwoSample(minTempTwoCalc.getTotalSample());

        scoreShortTermDTO.setMaxTempOneRate(calc(maxTempOneCalc, totalCalcRate));
        scoreShortTermDTO.setMaxTempOneSample(maxTempOneCalc.getTotalSample());

        scoreShortTermDTO.setMaxTempTwoRate(calc(maxTempTwoCalc, totalCalcRate));
        scoreShortTermDTO.setMaxTempTwoSample(maxTempTwoCalc.getTotalSample());

        if (totalCalcRate.getCount() > 0)
        {
            scoreShortTermDTO.setTotalRate(Float.parseFloat(new DecimalFormat("0.00").format((float)totalCalcRate.getSuccessCount()/totalCalcRate.getCount())));
            scoreShortTermDTO.setTotalSample(totalCalcRate.getTotalSample());
        }

         return scoreShortTermDTO;
    }

    @Override
    public ScoreShortTermDTO findAllByTimeAndRegionByDepartment(Date startTime, Date endTime, int fcstHours, int departmentId, int examId) {
        List<DepartmentDTO> departmentDTOS = new ArrayList<>();
        //List<ScoreShortTerm> scoreShortTermList;
        List<Department> departments;

        if (departmentId == 58000){
            departments = departmentMapper.findAllCity();
        }else {
            departments = departmentMapper.findAllByParentId(departmentId);
            departments.add(departmentMapper.findOneById(departmentId));
        }

        for (Department part : departments){
            List<ScoreShortTerm> scoreShortTermList = new ArrayList<>();
            for (Department depart : departmentMapper.findAllByParentId(part.getParentDepartId())){
                List<ScoreShortTerm> scoreShortTerms = scoreShortTermMapper.findAllByTimeAndRegionByDepartment(startTime, endTime, fcstHours, depart.getDepartId(), examId);
                scoreShortTermList.addAll(scoreShortTerms);
            }
            scoreShortTermList.addAll(scoreShortTermMapper.findAllByTimeAndRegionByDepartment(startTime, endTime, fcstHours, part.getDepartId(), examId));

            if (scoreShortTermList.size() == 0)
                continue;

            CalcRate calcRate = new CalcRate();
            for (ScoreShortTerm scoreShortTerm : scoreShortTermList){
                if (scoreShortTerm.getRainDay1() != 0){
                    if (scoreShortTerm.getRainDay1() ==1 || scoreShortTerm.getRainDay1() == 4)
                        calcRate.addSuccessCount();
                    calcRate.addCount();
                }
                if (scoreShortTerm.getRainDay2() != 0){
                    if (scoreShortTerm.getRainDay2() ==1 || scoreShortTerm.getRainDay2() == 4)
                        calcRate.addSuccessCount();
                    calcRate.addCount();
                }
                if (scoreShortTerm.getRainLevelValue1() != 0){
                    if (scoreShortTerm.getRainLevelValue1() ==1 || scoreShortTerm.getRainLevelValue1() == 4)
                        calcRate.addSuccessCount();
                    calcRate.addCount();
                }
                if (scoreShortTerm.getRainLevelValue2() != 0){
                    if (scoreShortTerm.getRainLevelValue2() ==1 || scoreShortTerm.getRainLevelValue2() == 4)
                        calcRate.addSuccessCount();
                    calcRate.addCount();
                }
                if (scoreShortTerm.getRainStormValue1() != 0){
                    if (scoreShortTerm.getRainStormValue1() ==1 || scoreShortTerm.getRainStormValue1() == 4)
                        calcRate.addSuccessCount();
                    calcRate.addCount();
                }
                if (scoreShortTerm.getRainStormValue2() != 0){
                    if (scoreShortTerm.getRainStormValue2() ==1 || scoreShortTerm.getRainStormValue2() == 4)
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
        ScoreShortTermDTO scoreShortTermDTO = new ScoreShortTermDTO();
        scoreShortTermDTO.setDepartments(departmentDTOS);
        return scoreShortTermDTO;
    }

    private float calc(CalcRate calcRate, CalcRate totalCalcRate){
        if (calcRate.getCount() > 0)
        {
            totalCalcRate.addSomeCount(calcRate.getCount(), calcRate.getSuccessCount());
            return Float.parseFloat(new DecimalFormat("0.00").format((float)calcRate.getSuccessCount()/calcRate.getCount()));
        }
        return 0;
    }

    private CalcRate calcRate(CalcRate calcRate, int value){
        if (value > 0){
            if (value == 1 || value == 4)
                calcRate.addSuccessCount();
            calcRate.addCount();
        }

        return calcRate;
    }
}
