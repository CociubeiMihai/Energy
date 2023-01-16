package com.example.energy.repositories;

import com.example.energy.entities.Consumption;
import com.example.energy.entities.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ConsumptionRepository extends JpaRepository<Consumption, UUID> {

    List<Consumption> findByTimestampBetweenAndDevice(LocalDateTime localDateTime1, LocalDateTime localDateTime2, Device device);
    List<Consumption> findByDevice(Device device);
}
