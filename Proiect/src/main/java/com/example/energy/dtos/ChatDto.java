package com.example.energy.dtos;

import com.example.energy.constrains.Status;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ChatDto {

    private String message;
    private String destinatar;
    private String sender;
    private Status status;

}
