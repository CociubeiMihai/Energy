package com.example.energy.services.imp;

import com.example.energy.constrains.Rol;
import com.example.energy.dtos.*;
import com.example.energy.entities.Device;
import com.example.energy.entities.Person;
import com.example.energy.repositories.PersonRepository;
import com.example.energy.services.DeviceService;
import com.example.energy.services.PersonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PersonServiceImp implements PersonService {

    private static final Logger LOGGER = LoggerFactory.getLogger(PersonService.class);
    private final PersonRepository personRepository;
    private final DeviceService deviceService;
    private final SimpMessagingTemplate template;

    @Autowired
    public PersonServiceImp(PersonRepository personRepository, DeviceService deviceService, SimpMessagingTemplate template) {
        this.personRepository = personRepository;
        this.deviceService = deviceService;
        this.template = template;
    }

    @Override
    public Optional<Person> logIn(LogInDto logInDto) {
        return personRepository.findByNameAndPassword(logInDto.getName(), logInDto.getPassword());
    }

    @Override
    public Person changeRol(RolUpdateDto rolUpdateDto) {
        Person user = personRepository.findByName(rolUpdateDto.getName());
        user.setRol(rolUpdateDto.getRol());
        for(Device device: user.getDevices()) {
            device.setAssigned(false);
            deviceService.save(device);
        }
        user.setDevices(new ArrayList<>());
        personRepository.save(user);
        return user;
    }

    @Override
    public void remove(UUIDListDto id) {
        for(UUID id_user: id.getUuidList()){
            Person person = personRepository.findById(id_user).get();
            for(Device device: person.getDevices()){
                device.setAssigned(false);
                deviceService.save(device);
            }
            personRepository.delete(person);
        }
    }

    @Override
    public Person addDevice(AsignDto asignDto) {
        Person person = personRepository.findByName(asignDto.getNumeUser());
        for(UUID id_device : asignDto.getDevice_id()){
            Device device = deviceService.findById(id_device).get();
            device.setAssigned(true);
            deviceService.save(device);
            person.getDevices().add(device);
        }
        personRepository.save(person);
        return null;
    }

    @Override
    public Optional<Person> findById(UUID id) {
        return personRepository.findById(id);
    }

    @Override
    public Person register(LogInDto logInDto) {
        List<Device> deviceList = new LinkedList<>();
        Person p = Person.builder().name(logInDto.getName()).rol(Rol.USER).password(logInDto.getPassword()).devices(deviceList).build();
        personRepository.save(p);
        return p;
    }

    @Override
    public List<Device> allDevices(UUID id) {
        return findById(id).get().getDevices();
    }

    @Override
    public List<Person> findAllUsers() {
        return personRepository.findByRol(Rol.USER);
    }

    @Override
    public List<Person> findAll() {
        return personRepository.findAll();
    }

    @Override
    public void chatMessages(ChatDto chatDto) {
        this.template.convertAndSendToUser(chatDto.getDestinatar(),"/chat",chatDto);
    }
}
