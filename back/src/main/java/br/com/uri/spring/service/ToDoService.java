package br.com.uri.spring.service;

import br.com.uri.spring.dto.ToDoDTO;
import br.com.uri.spring.entities.ToDoEntity;
import br.com.uri.spring.repositories.UserRepository;
import br.com.uri.spring.repositories.ToDoRepository;

import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class ToDoService {

    private final ToDoRepository todoRepository;

    public ToDoService(ToDoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
    }

    public void saveObject(ToDoDTO toDoDTO, Integer user_id) {
        ToDoEntity todoEntity = new ToDoEntity();

        // Criar o To Do Item
        todoEntity.setTitle(toDoDTO.getTitle());
        todoEntity.setUser_id(user_id);
        todoEntity.setCompleted(toDoDTO.isCompleted());

        todoRepository.save(todoEntity);
    }

    public void updateObject(ToDoDTO toDoDTO, Long id) {
        Optional<ToDoEntity> toDoEntity = todoRepository.findById(id);
        if (toDoEntity.isPresent()) {
            ToDoEntity updatedEntity = toDoEntity.get();
            updatedEntity.setTitle(toDoDTO.getTitle());
            updatedEntity.setCompleted(toDoDTO.isCompleted());
            todoRepository.save(updatedEntity);
        } else {
            // Entity not found
        }
    }

    public void deleteObject(Long id) {
        Optional<ToDoEntity> toDoEntity = todoRepository.findById(id);
        if (toDoEntity.isPresent()) {
            todoRepository.deleteById(id);
        } else {
            // Entity not found
        }
    }

}
