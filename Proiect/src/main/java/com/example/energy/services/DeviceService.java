package com.example.energy.services;

import com.example.energy.dtos.DeviceDto;
import com.example.energy.dtos.UUIDListDto;
import com.example.energy.entities.Device;
import com.example.energy.entities.Person;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public interface DeviceService {

    Optional<Device> findById(UUID id);
    Device saveDevice(DeviceDto deviceDto);
    void remove(UUIDListDto id);
    List<Device> allDevicesUnsigned();
    Device save(Device device);
    List<Device> findAll();
    Device create(DeviceDto deviceDto);
    Person findPersonByDevice(UUID dev_id);

}
