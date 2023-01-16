package com.example.energy.repositories;

import com.example.energy.constrains.Rol;
import com.example.energy.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PersonRepository extends JpaRepository<Person, UUID> {

    Optional<Person> findByNameAndPassword(String name, String password);
    Optional<Person> findById(UUID id);
    List<Person> findByRol(Rol rol);
    Person findByName(String name);

}
