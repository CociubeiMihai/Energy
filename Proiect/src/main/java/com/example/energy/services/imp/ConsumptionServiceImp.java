package com.example.energy.services.imp;

import com.example.energy.dtos.ConsumptionDto;
import com.example.energy.dtos.DailyConsumprionDto;
import com.example.energy.dtos.RbbItDto;
import com.example.energy.entities.Consumption;
import com.example.energy.entities.Device;
import com.example.energy.entities.Person;
import com.example.energy.utils.MQConfig;
import com.example.energy.repositories.ConsumptionRepository;
import com.example.energy.services.ConsumptionService;
import com.example.energy.services.DeviceService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.management.Notification;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
public class ConsumptionServiceImp implements ConsumptionService {

    private final ConsumptionRepository consumptionRepository;
    private final DeviceService deviceService;
    private final SimpMessagingTemplate template;

    public ConsumptionServiceImp(ConsumptionRepository consumptionRepository, DeviceService deviceService, SimpMessagingTemplate template) {
        this.consumptionRepository = consumptionRepository;
        this.deviceService = deviceService;
        this.template = template;
    }

    @Override
    public Consumption saveConsumtion(ConsumptionDto consumptionDto) {
        Device device = deviceService.findById(consumptionDto.getDevice_id()).get();
        Consumption consumption = Consumption.builder()
                .device(device)
                .energyConsumption(consumptionDto.getEnergyConsumption())
                .timestamp(consumptionDto.getTimestamp())
                .build();
        consumptionRepository.save(consumption);
        return consumption;
    }

    @Override
    public List<Consumption> findConsumtion(DailyConsumprionDto dailyConsumprionDto) {

        LocalDateTime time1 =  LocalDateTime.of(dailyConsumprionDto.getZi(), LocalTime.MIN);
        LocalDateTime time2 =  LocalDateTime.of(dailyConsumprionDto.getZi(), LocalTime.MAX);
        Device device = deviceService.findById(dailyConsumprionDto.getDevice_id()).get();
        List<Consumption> consumptions = consumptionRepository.findByTimestampBetweenAndDevice(time1, time2,device);
        if(consumptions.size() > 2)
            return consumptions.subList(1,consumptions.size());
        return consumptions;
    }

    public List<Consumption> findConsumtionByHour(Consumption newConsumption) {

        LocalDate zi = newConsumption.getTimestamp().toLocalDate();
        LocalDateTime time1 =  LocalDateTime.of(zi, LocalTime.of(newConsumption.getTimestamp().getHour(),0,0));
        LocalDateTime time2 =  LocalDateTime.of(zi, LocalTime.of(newConsumption.getTimestamp().getHour(),59,59));
        return consumptionRepository.findByTimestampBetweenAndDevice(time1, time2,newConsumption.getDevice());
    }

    public boolean checkConsumption(Consumption newConsumption){
        List<Consumption> consumptions = findConsumtionByHour(newConsumption);
        double current = 0;
        for(Consumption c : consumptions)
            current += c.getEnergyConsumption();
        return !(current + newConsumption.getEnergyConsumption() > newConsumption.getDevice().getMaxHourlyConsumption());
    }

    @Override
    public List<Consumption> findByDevice(UUID id) {
        return consumptionRepository.findByDevice(deviceService.findById(id).get());
    }

    @RabbitListener(queues = MQConfig.QUEUE)
    public void listener(RbbItDto rbbItDto){
        //System.out.println(rbbItDto);
        if(!deviceService.findById(rbbItDto.getDevice_id()).isPresent())
            return;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(rbbItDto.getTimestamp(), formatter);
        Consumption consumption = Consumption.builder()
                .energyConsumption(Double.parseDouble(rbbItDto.getMeasurement_value()))
                .device(deviceService.findById(rbbItDto.getDevice_id()).get())
                .timestamp(dateTime)
                .build();
        if(checkConsumption(consumption)){
            System.out.println(consumption);
            consumptionRepository.save(consumption);
        }
        else{
            if(!consumption.getDevice().isAssigned())
                return;
            Person person = deviceService.findPersonByDevice(consumption.getDevice().getId());
            this.template.convertAndSendToUser(person.getName(),"/private","You exceeded the limit");// /user/UserName/private
            System.out.println("***************Eroareeeeeeee************");
        }


    }
}
