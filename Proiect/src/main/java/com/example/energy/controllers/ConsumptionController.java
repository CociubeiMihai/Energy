package com.example.energy.controllers;

import com.example.energy.dtos.ConsumptionDto;
import com.example.energy.dtos.DailyConsumprionDto;
import com.example.energy.dtos.LogInDto;
import com.example.energy.services.ConsumptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/consumption")
public class ConsumptionController {

    private final ConsumptionService consumptionService;

    public ConsumptionController(ConsumptionService consumptionService) {
        this.consumptionService = consumptionService;
    }

    @PostMapping("/cons")
    public ResponseEntity findConsumption(@RequestBody DailyConsumprionDto dailyConsumprionDto){
        return ResponseEntity.status(HttpStatus.OK).body(consumptionService.findConsumtion(dailyConsumprionDto));
    }

    @PostMapping()
    public ResponseEntity save(@RequestBody ConsumptionDto consumptionDto){
        return ResponseEntity.status(HttpStatus.OK).body(consumptionService.saveConsumtion(consumptionDto));
    }

    @GetMapping("{id}")
    public ResponseEntity findByDevice(@PathVariable UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(consumptionService.findByDevice(id));
    }

}
