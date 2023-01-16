package com.example.energy.utils.initialization;

import com.example.energy.constrains.Rol;
import com.example.energy.entities.Consumption;
import com.example.energy.entities.Device;
import com.example.energy.entities.Person;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

@Component
public class MockDataRepo {

    private static final Long noOfEntities = 4L;

    public List<Person> initUsers(List<Device> deviceList){
        List<Person> persoane = new LinkedList<>();
        for (Long i = 0L; i < noOfEntities; i++) {
            List<Device> devices = new LinkedList<>();
            devices.add(deviceList.get(i.intValue()));
            devices.add(deviceList.get(i.intValue() + noOfEntities.intValue()));
            persoane.add(Person.builder()
                    .name("Nume_"+i)
                    .password("pass")
                    .rol(Rol.USER)
                    .devices(devices)
                    .build()
            );
        }
        persoane.add(Person.builder().rol(Rol.ADMIN).name("Admin").password("pass").build());
        return persoane;
    }

    public List<Device> initDevices(){
        List<Device> deviceList = new LinkedList<>();
        for (Long i = 0L; i < noOfEntities * 2 + 2; i++) {
            deviceList.add(Device.builder()
                    .description("Descriere_" + i)
                    .address("Address_" + i)
                    .maxHourlyConsumption(i.intValue() * 2 + 15)
                    .assigned(i < noOfEntities * 2)
                    .build()
            );
        }
        return deviceList;
    }

    public List<Consumption> initConsumptions(Device device, LocalDate localDate){
        List<Consumption> consumptionList = new LinkedList<>();
        int[] a = {0, 1, 1, 1, 1, 1, 1, 4, 6, 6, 6,10, 12 ,12, 15,16,18,18 ,18, 15, 10,9,8,7,6,5};
        for (Long i = 0L; i < 24; i++) {
            consumptionList.add(Consumption.builder()
                    .timestamp(localDate.atTime(i.intValue(),0))
                    .energyConsumption(a[i.intValue()])
                    .device(device)
                    .build()
            );
        }
        return consumptionList;
    }

}
