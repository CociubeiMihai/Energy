package com.example.energy.repositories;

import com.example.energy.entities.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DeviceRepository extends JpaRepository<Device, UUID> {

    Optional<Device> findById(UUID id);
    List<Device> findByAssigned(boolean assigned);

}
