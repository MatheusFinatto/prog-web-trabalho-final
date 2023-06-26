package br.com.uri.spring.controller;


import br.com.uri.spring.dto.LoginDTO;
import br.com.uri.spring.dto.ToDoDTO;
import br.com.uri.spring.dto.UserDTO;
import br.com.uri.spring.entities.ToDoEntity;
import br.com.uri.spring.service.ToDoService;
import br.com.uri.spring.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/v1")
public class ToDoController {
    private ToDoService toDoService;
    private UserService userService;

    public ToDoController(ToDoService toDoService, UserService userService) {
        this.toDoService = toDoService;
        this.userService = userService;
    }

    // Cria um novo usário
    @PostMapping("/register")
    public ResponseEntity<Void> postRegister(@RequestBody
                         @Valid UserDTO userDTO) {
        return userService.saveObject(userDTO);
    }

    // Efetua o login do usuário
    @PostMapping("/login")
    public ResponseEntity<Void> postLogin(@RequestBody
                         @Valid LoginDTO loginDTO) {
        return userService.login(loginDTO);
    }

    @GetMapping("todos")
    public List<ToDoEntity> getTodos() {

        return toDoService.getAllTodos();
    }

    // Cria um novo To Do
    @PostMapping("todos")
    public ResponseEntity<Void> postTodos(@RequestBody ToDoDTO toDoDTO) {
        return toDoService.saveObject(toDoDTO);
    }


    @PutMapping("todos/{id}")
    public ResponseEntity<Void> putTodos(@RequestBody ToDoDTO toDoDTO, @PathVariable Long id) {
        return toDoService.updateObject(toDoDTO, id);
    }

    @DeleteMapping("todos/{id}")
    public ResponseEntity<Void> deleteTodos(@PathVariable Long id) {
        return toDoService.deleteObject(id);
    }
}
