package br.com.uri.spring.service;

import br.com.uri.spring.dto.ToDoDTO;
import br.com.uri.spring.entities.ToDoEntity;
import br.com.uri.spring.repositories.UserRepository;
import br.com.uri.spring.repositories.ToDoRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ToDoService {

    private final ToDoRepository todoRepository;

    public ToDoService(ToDoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
    }

    public List<ToDoEntity> getAllTodos(Integer user_id) {
        return todoRepository.findByUserId(user_id);
    }

    public ResponseEntity saveObject(ToDoDTO toDoDTO) {
        ToDoEntity todoEntity = new ToDoEntity();

        // Criar o To Do Item
        todoEntity.setTitle(toDoDTO.getTitle());
        todoEntity.setUser_id(toDoDTO.getUser_id());
        todoEntity.setCompleted(toDoDTO.isCompleted());

        todoRepository.save(todoEntity);

        if (todoEntity != null){
            return new ResponseEntity("Created", HttpStatus.CREATED);
        } else {
            return new ResponseEntity("It was not possible to create your to do", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity updateObject(ToDoDTO toDoDTO, Long id) {
        Optional<ToDoEntity> toDoEntity = todoRepository.findById(id);
        if (toDoEntity.isPresent()) {
            ToDoEntity updatedEntity = toDoEntity.get();
            updatedEntity.setTitle(toDoDTO.getTitle());
            updatedEntity.setCompleted(toDoDTO.isCompleted());
            todoRepository.save(updatedEntity);
            return new ResponseEntity("Updated", HttpStatus.OK);
        } else {
            return new ResponseEntity("It was not possible to update your to do", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity deleteObject(Long id) {
        Optional<ToDoEntity> toDoEntity = todoRepository.findById(id);
        if (toDoEntity.isPresent()) {
            todoRepository.deleteById(id);
            return new ResponseEntity("Deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity("It was not possible to delete your to do", HttpStatus.NOT_FOUND);
        }
    }

}
