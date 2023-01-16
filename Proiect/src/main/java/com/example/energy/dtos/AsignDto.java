package com.example.energy.dtos;

import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
public class AsignDto {

    private String numeUser;
    private List<UUID> device_id;

}
