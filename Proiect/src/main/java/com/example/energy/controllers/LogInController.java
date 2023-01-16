package com.example.energy.controllers;

import com.example.energy.dtos.LogInDto;
import com.example.energy.entities.Person;
import com.example.energy.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class LogInController {

    private final PersonService personService;

    @Autowired
    public LogInController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping
    public ResponseEntity login(@RequestBody LogInDto logInDto){
        Optional<Person> personOptional = personService.logIn(logInDto);
        if(!personOptional.isPresent())
            return ResponseEntity.status(HttpStatus.OK).body("Nu s-a gasit");
        return ResponseEntity.status(HttpStatus.OK).body(personOptional.get());
    }

}
