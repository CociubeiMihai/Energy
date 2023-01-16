package com.example.energy.dtos;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;

@Getter
@Setter
public class LogInDto {

    private String name;
    private String password;

}
