package com.example.energy.services.imp;

import com.example.energy.dtos.DeviceDto;
import com.example.energy.dtos.UUIDListDto;
import com.example.energy.entities.Device;
import com.example.energy.entities.Person;
import com.example.energy.repositories.DeviceRepository;
import com.example.energy.repositories.PersonRepository;
import com.example.energy.services.DeviceService;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DeviceServiceImp implements DeviceService {

    private final DeviceRepository deviceRepository;
    private final PersonRepository personRepository;

    public DeviceServiceImp(DeviceRepository deviceRepository, PersonRepository personRepository) {
        this.deviceRepository = deviceRepository;
        this.personRepository = personRepository;
    }

    @Override
    public Optional<Device> findById(UUID id) {
        return deviceRepository.findById(id);
    }

    @Override
    public Device saveDevice(DeviceDto deviceDto) {
        return deviceRepository.save(Device.builder().
                address(deviceDto.getAddress()).
                description(deviceDto.getDescription()).
                maxHourlyConsumption(deviceDto.getMaxHourlyConsumption()).
                id(deviceDto.getId_user()).
                assigned(deviceDto.isAssigned())
                .build());
    }

    public Person findPersonByDevice(UUID idDevice) {
        Device device = deviceRepository.findById(idDevice).get();
        for(Person p: personRepository.findAll()){
            for(Device d: p.getDevices()){
                if(device.getId().equals(d.getId()))
                    return p;
            }
        }
        return null;
    }

    @Override
    public void remove(UUIDListDto id) {
        for (UUID uuid : id.getUuidList()) {
            Device device = deviceRepository.findById(uuid).get();
            if(device.isAssigned()){
                Person person = findPersonByDevice(uuid);
                System.out.println(person.getDevices().size());
                List<Device> deviceList = new LinkedList<>();
                for(Device device1: person.getDevices()){
                    if(!device1.getId().equals(device.getId()))
                        deviceList.add(device1);
                }
                person.setDevices(deviceList);
                personRepository.save(person);
            }
            deviceRepository.delete(device);
        }
    }

    @Override
    public List<Device> allDevicesUnsigned() {
        return deviceRepository.findByAssigned(false);
    }

    @Override
    public Device save(Device device) {
        return deviceRepository.save(device);
    }

    @Override
    public List<Device> findAll() {
        return deviceRepository.findAll();
    }

    @Override
    public Device create(DeviceDto deviceDto) {
        return deviceRepository.save(Device.builder().
                address(deviceDto.getAddress()).
                description(deviceDto.getDescription()).
                maxHourlyConsumption(deviceDto.getMaxHourlyConsumption()).
                assigned(false)
                .build());
    }
}
