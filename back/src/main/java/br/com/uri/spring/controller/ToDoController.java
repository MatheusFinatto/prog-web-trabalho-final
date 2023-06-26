package br.com.uri.spring.controller;


import br.com.uri.spring.dto.ToDoDTO;
import br.com.uri.spring.dto.UserDTO;
import br.com.uri.spring.service.ToDoService;
import br.com.uri.spring.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1")
public class ToDoController {
    private ToDoService toDoService;
    private UserService userService;

    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    // Cria um novo usário
    @PostMapping("/register")
    public ResponseEntity<Void> postRegister(@RequestBody
                         @Valid UserDTO userDTO) {
        userService.saveObject(userDTO);
        return ResponseEntity.accepted().build();
    }

    // Efetua o login do usuário
    @PostMapping("/login")
    public ResponseEntity<Void> postLogin(@RequestBody
                         @Valid UserDTO userDTO) {
        userService.saveObject(userDTO);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("todos")
    public ResponseEntity<Void> getTodos() {
        return ResponseEntity.accepted().build();
    }

    // Cria um novo To Do
    @PostMapping("todos")
    public ResponseEntity<Void> postTodos(@RequestBody ToDoDTO toDoDTO) {
        toDoService.saveObject(toDoDTO, 1);
        return ResponseEntity.accepted().build();
    }


    @PutMapping("todos/{id}")
    public ResponseEntity<Void> putTodos(@RequestBody ToDoDTO toDoDTO, @PathVariable Long id) {
        toDoService.updateObject(toDoDTO, id);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("todos/{id}")
    public ResponseEntity<Void> deleteTodos(@PathVariable Long id) {
        toDoService.deleteObject(id);
        return ResponseEntity.accepted().build();
    }
}
