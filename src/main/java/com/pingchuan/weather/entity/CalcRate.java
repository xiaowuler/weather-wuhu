package com.pingchuan.weather.entity;

import lombok.Data;

/**
 * @description: 计算正确率类
 * @author: XW
 * @create: 2019-06-17 15:55
 **/

@Data
public class CalcRate {

    private int count;

    private int successCount;

    public CalcRate(){
        count = 0;
        successCount = 0;
    }

    public void addCount(){
        count++;
    }

    public void addSuccessCount(){
        successCount++;
    }

    public void addSomeCount(int count, int successCount){
        this.count += count;
        this.successCount += successCount;
    }

    public String getTotalSample(){
        return String.format("%s/%s", this.successCount, this.count);
    }
}
