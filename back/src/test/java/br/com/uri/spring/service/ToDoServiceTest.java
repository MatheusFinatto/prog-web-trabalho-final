package br.com.uri.spring.service;

import br.com.uri.spring.dto.UserDTO;
import br.com.uri.spring.dto.ToDoDTO;
import br.com.uri.spring.repositories.UserRepository;
import br.com.uri.spring.repositories.ToDoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ToDoServiceTest {

    private ToDoService toDoService;

    @Mock
    private ToDoRepository todoRepository;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    public void initService() {
        this.toDoService =
                new ToDoService(todoRepository, userRepository);
    }

    @Test
    public void givenAValidRequestWhenCreatingPersonThenSave(){
        this.toDoService.saveObject(buildMockPayload(), 1);
        Mockito.verify(todoRepository, Mockito.times(1)).save(Mockito.any());
    }

    private ToDoDTO buildMockPayload() {
        ToDoDTO toDo = new ToDoDTO();
        toDo.setTitle("Learn Cobol");
        toDo.setCompleted(false);
        return toDo;
    }


}
