package com.Calculator.CopilotCalculator.controller;

import com.Calculator.CopilotCalculator.model.Operation;
import com.Calculator.CopilotCalculator.model.Result;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/arithmetic")
public class CalculatorController {
    @PostMapping("/add")
    public Result add(@RequestBody Operation operation) {
        return new Result(operation.getA() + operation.getB());
    }

    @PostMapping("/subtract")
    public Result subtract(@RequestBody Operation operation) {
        return new Result(operation.getA() - operation.getB());
    }

    @PostMapping("/multiply")
    public Result multiply(@RequestBody Operation operation) {
        return new Result(operation.getA() * operation.getB());
    }

    @PostMapping("/divide")
    public Result divide(@RequestBody Operation operation) {
        return new Result(operation.getA() / operation.getB());
    }
}
