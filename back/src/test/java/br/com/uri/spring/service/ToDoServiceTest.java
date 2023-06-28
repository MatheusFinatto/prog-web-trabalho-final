package br.com.uri.spring.service;

import br.com.uri.spring.dto.ToDoDTO;
import br.com.uri.spring.entities.ToDoEntity;
import br.com.uri.spring.entities.UserEntity;
import br.com.uri.spring.repositories.UserRepository;
import br.com.uri.spring.repositories.ToDoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ToDoServiceTest {

    @Mock
    private ToDoRepository todoRepository;

    @InjectMocks
    private ToDoService todoService;

    @Test
    public void testSaveObject_Success() {
        // Cria um ToDoDTO de exemplo
        ToDoDTO toDoDTO = new ToDoDTO("Learn Flutter", false, 1);

        // Cria um ToDoEntity de exemplo usando os setters
        ToDoEntity toDoEntity = new ToDoEntity();
        toDoEntity.setTitle(toDoDTO.getTitle());
        toDoEntity.setUser_id(toDoDTO.getUser_id());
        toDoEntity.setCompleted(toDoDTO.isCompleted());

        // Configura o mock para retornar o ToDoEntity criado quando save() for chamado
        when(todoRepository.save(ArgumentMatchers.any(ToDoEntity.class))).thenReturn(toDoEntity);

        // Chama o método que você deseja testar
        ResponseEntity response = todoService.saveObject(toDoDTO);

        // Verifica se a resposta é a esperada
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Created", response.getBody());

        // Verifica se o método save foi chamado com o ToDoEntity correto
        verify(todoRepository).save(toDoEntity);
    }

    @Test
    public void testUpdateObject_Success() {
        // Cria um ToDoDTO de exemplo
        ToDoDTO toDoDTO = new ToDoDTO("Updated Task", true, 1);

        // Cria um ToDoEntity de exemplo usando os setters
        ToDoEntity existingTodo = createToDoEntity("Learn React", 1, false);
        existingTodo.setId(1L);

        // Configura o mock para retornar o ToDoEntity existente quando findById() for chamado
        when(todoRepository.findById(1L)).thenReturn(Optional.of(existingTodo));

        // Chama o método que você deseja testar
        ResponseEntity response = todoService.updateObject(toDoDTO, 1L);

        // Verifica se a resposta é a esperada
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Updated", response.getBody());

        // Verifica se o método save foi chamado com o ToDoEntity atualizado
        verify(todoRepository).save(existingTodo);
    }

    @Test
    public void testDeleteObject_Success() {
        // Cria um ToDoEntity de exemplo usando os setters
        ToDoEntity existingTodo = createToDoEntity("Learn Spring", 1, false);
        existingTodo.setId(1L);

        // Configura o mock para retornar o ToDoEntity existente quando findById() for chamado
        when(todoRepository.findById(1L)).thenReturn(Optional.of(existingTodo));

        // Chama o método que você deseja testar
        ResponseEntity response = todoService.deleteObject(1L);

        // Verifica se a resposta é a esperada
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Deleted", response.getBody());

        // Verifica se o método deleteById foi chamado com o ID correto
        verify(todoRepository).deleteById(1L);
    }

    // Método auxiliar para criar uma instância de ToDoEntity
    private ToDoEntity createToDoEntity(String title, Integer userId, boolean completed) {
        ToDoEntity toDoEntity = new ToDoEntity();
        toDoEntity.setTitle(title);
        toDoEntity.setUser_id(userId);
        toDoEntity.setCompleted(completed);
        return toDoEntity;
    }

    private ToDoDTO buildMockPayload() {
        ToDoDTO toDo = new ToDoDTO();
        toDo.setTitle("Learn Cobol");
        toDo.setCompleted(false);
        return toDo;
    }


}
