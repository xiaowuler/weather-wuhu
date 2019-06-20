package com.pingchuan.weather.Util;

import lombok.Data;

/**
 * @description: 级别 计算类
 * @author: XW
 * @create: 2019-06-19 17:21
 **/

@Data
public class WarningCalc {

    private int correctCount;

    private int hitCount;

    private int emptyCount;

    private int missingCount;

    private float leadTimeCount;

    private int totalCount;

    public void addCorrectCount(){
        this.correctCount++;
    }

    public void addHitCount(){
        this.hitCount++;
    }

    public void addEmptyCount(){
        this.emptyCount++;
    }

    public void addMissingCount(){
        this.missingCount++;
    }

    public void addTotalCount(){
        this.totalCount++;
    }

    public void addLeadTimeCount(float leadTimeCount){
        this.leadTimeCount += leadTimeCount;
    }

}
