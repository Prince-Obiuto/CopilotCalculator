package com.Calculator.CopilotCalculator.model;

public class Result {
    private final double result;

    public Result(double result) {
        this.result = result;
    }

    // Getter
    public double getResult() {
        return result;
    }

    @Override
    public String toString() {
        return "Result{" +
                "result=" + result +
                '}';
    }
}
