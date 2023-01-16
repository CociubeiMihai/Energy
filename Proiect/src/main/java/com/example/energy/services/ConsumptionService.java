package com.example.energy.services;

import com.example.energy.dtos.ConsumptionDto;
import com.example.energy.dtos.DailyConsumprionDto;
import com.example.energy.entities.Consumption;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public interface ConsumptionService {

    Consumption saveConsumtion(ConsumptionDto consumptionDto);
    List<Consumption> findConsumtion(DailyConsumprionDto dailyConsumprionDto);
    List<Consumption> findByDevice(UUID id);

}
