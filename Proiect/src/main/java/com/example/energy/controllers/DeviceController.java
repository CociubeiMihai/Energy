package com.example.energy.controllers;

import com.example.energy.dtos.DeviceDto;
import com.example.energy.dtos.LogInDto;
import com.example.energy.dtos.UUIDListDto;
import com.example.energy.entities.Person;
import com.example.energy.services.DeviceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/device")
public class DeviceController {


    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @PostMapping
    public ResponseEntity saveDevice(@RequestBody DeviceDto deviceDto){
        return ResponseEntity.status(HttpStatus.OK).body(deviceService.saveDevice(deviceDto));
    }

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody DeviceDto deviceDto){
        return ResponseEntity.status(HttpStatus.OK).body(deviceService.create(deviceDto));
    }

    @PostMapping("/removeDiv")
    public ResponseEntity removeDevice(@RequestBody UUIDListDto id){
        deviceService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).body("sters");
    }

    @GetMapping()
    public ResponseEntity findAllUnasigned(){
        return ResponseEntity.status(HttpStatus.OK).body(deviceService.allDevicesUnsigned());
    }

    @GetMapping("/all")
    public ResponseEntity findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(deviceService.findAll());
    }


}
