package br.com.uri.spring.repositories;


import br.com.uri.spring.entities.ToDoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ToDoRepository extends JpaRepository<ToDoEntity, Long> {

    Optional<ToDoEntity> findById(Integer id);

    @Query("SELECT t FROM ToDoEntity t WHERE t.user_id = :user_id")
    List<ToDoEntity> findByUserId(Integer user_id);

}
