package com.example.energy.services;

import com.example.energy.dtos.*;
import com.example.energy.entities.Device;
import com.example.energy.entities.Person;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public interface PersonService {

    Optional<Person> logIn(LogInDto logInDto);
    Person changeRol(RolUpdateDto rolUpdateDto);
    void remove(UUIDListDto id);
    Person addDevice(AsignDto asignDto);
    Optional<Person> findById(UUID id);
    Person register(LogInDto logInDto);
    List<Device> allDevices(UUID id);
    List<Person> findAllUsers();
    List<Person> findAll();
    void chatMessages(ChatDto chatDto);

}
