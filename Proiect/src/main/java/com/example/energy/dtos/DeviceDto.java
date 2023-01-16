package com.example.energy.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class DeviceDto {

    private UUID id_user;
    private String description;
    private String address;
    private int maxHourlyConsumption;
    private boolean assigned;

}
