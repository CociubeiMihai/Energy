package com.example.energy.dtos;

import com.example.energy.entities.Device;
import lombok.Getter;

import javax.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public class ConsumptionDto {

    private LocalDateTime timestamp;
    private int energyConsumption;
    private UUID device_id;

}
