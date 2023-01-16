package com.example.energy.dtos;

import com.example.energy.constrains.Rol;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class RolUpdateDto {

    private Rol rol;
    private String name;
}
