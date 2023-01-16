package com.example.energy.dtos;

import lombok.Getter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
public class DailyConsumprionDto {

    private LocalDate zi;
    private UUID device_id;

}
