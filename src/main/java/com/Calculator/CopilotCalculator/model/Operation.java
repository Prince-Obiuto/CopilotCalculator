package com.Calculator.CopilotCalculator.model;

public class Operation {
    private double a;
    private double b;

    public Operation() {}

    public Operation(double a, double b) {
        this.a = a;
        this.b = b;
    }

    //Getters and setters
    public double getA() {
        return a;
    }
    public void setA(double a) {
        this.a = a;
    }
    public double getB() {
        return b;
    }
    public void setB(double b) {
        this.b = b;
    }

    @Override
    public String toString() {
        return "Operation{" +
                "a=" + a +
                ", b=" + b +
                '}';
    }
}
