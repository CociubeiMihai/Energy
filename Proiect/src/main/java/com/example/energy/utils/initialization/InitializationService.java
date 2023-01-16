package com.example.energy.utils.initialization;


import com.example.energy.entities.Device;
import com.example.energy.repositories.ConsumptionRepository;
import com.example.energy.repositories.DeviceRepository;
import com.example.energy.repositories.PersonRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class InitializationService {

    private static final int lastDays = 10;

    private final PersonRepository personRepository;
    private final DeviceRepository deviceRepository;
    private final ConsumptionRepository consumptionRepository;
    private final MockDataRepo mockDataRepo;

    public InitializationService(PersonRepository personRepository, DeviceRepository deviceRepository, ConsumptionRepository consumptionRepository, MockDataRepo mockDataRepo) {
        this.personRepository = personRepository;
        this.deviceRepository = deviceRepository;
        this.consumptionRepository = consumptionRepository;
        this.mockDataRepo = mockDataRepo;
    }

    @Bean
    public void initializeData(){
        List<Device> deviceList = mockDataRepo.initDevices();
        deviceRepository.saveAll(deviceList);
        personRepository.saveAll(mockDataRepo.initUsers(deviceList));
        for(int j = 1; j < lastDays; j++) {
            for (int i = 0; i < deviceList.size(); i++) {
                consumptionRepository.saveAll(mockDataRepo.initConsumptions(deviceList.get(i), LocalDate.now().minusDays(j)));
            }
        }
    }
}
