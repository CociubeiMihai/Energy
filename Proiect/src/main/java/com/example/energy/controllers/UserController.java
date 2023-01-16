package com.example.energy.controllers;

import com.example.energy.dtos.*;
import com.example.energy.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/person")
public class UserController {


    private final PersonService personService;

    @Autowired
    public UserController(PersonService personService) {
        this.personService = personService;
    }

    @PatchMapping("/register")
    public ResponseEntity register(@RequestBody LogInDto logInDto){
        return ResponseEntity.status(HttpStatus.OK).body(personService.register(logInDto));
    }

    @PatchMapping("/rol")
    public ResponseEntity changeRol(@RequestBody RolUpdateDto rolUpdateDto){
        return ResponseEntity.status(HttpStatus.OK).body(personService.changeRol(rolUpdateDto));
    }

    @PostMapping("/remove")
    public ResponseEntity removeUsers(@RequestBody UUIDListDto id){
        personService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).body( "am sters");
    }

    @PostMapping("/deviceAsign")
    public ResponseEntity assignDevice(@RequestBody AsignDto asignDto){
        System.out.println(asignDto.getDevice_id());
        return ResponseEntity.status(HttpStatus.OK).body(personService.addDevice(asignDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity getAllDev(@PathVariable UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(personService.allDevices(id));
    }

    @GetMapping("/all")
    public ResponseEntity getAllUsers(){
        return ResponseEntity.status(HttpStatus.OK).body(personService.findAllUsers());
    }

    @GetMapping()
    public ResponseEntity getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(personService.findAll());
    }

    @GetMapping("/private")
    public ChatDto recevePrivateMessage(@RequestBody ChatDto chatDto){
        personService.chatMessages(chatDto);
        return chatDto;
    }

    @GetMapping("/findUser/{id}")
    public ResponseEntity findUser(@PathVariable UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(personService.findById(id));
    }

}
