package com.example.energy.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RbbItDto {

    private String timestamp;
    private UUID device_id;
    private String measurement_value;
}
