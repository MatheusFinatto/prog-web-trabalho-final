package br.com.uri.spring.repositories;


import br.com.uri.spring.entities.ToDoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ToDoRepository extends JpaRepository<ToDoEntity, Long> {

    Optional<ToDoEntity> findByName(String name);

}
