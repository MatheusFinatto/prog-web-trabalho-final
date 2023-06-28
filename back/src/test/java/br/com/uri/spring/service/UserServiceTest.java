package br.com.uri.spring.service;

import br.com.uri.spring.dto.LoginDTO;
import br.com.uri.spring.dto.ToDoDTO;
import br.com.uri.spring.dto.UserDTO;
import br.com.uri.spring.dto.UserResponseDTO;
import br.com.uri.spring.entities.UserEntity;
import br.com.uri.spring.repositories.UserRepository;
import br.com.uri.spring.repositories.ToDoRepository;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.OngoingStubbing;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        userService = new UserService(userRepository);
    }

    @Test
    public void testSaveObject_Success() {
        // Cria um UserDTO de exemplo
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("Luiz");
        userDTO.setEmail("luiz.disarz@gmail.com");
        userDTO.setPassword("1234");

        // Mock do UserRepository para retornar um objeto UserEntity ao salvar
        when(userRepository.save(ArgumentMatchers.any(UserEntity.class))).thenReturn(new UserEntity());

        // Chama o método que você deseja testar
        ResponseEntity response = userService.saveObject(userDTO);

        // Verifica se a resposta é a esperada
        assertEquals(HttpStatus.OK, response.getStatusCode());

        UserResponseDTO expectedResponse = new UserResponseDTO();
        expectedResponse.setMessage("Created");
        expectedResponse.setUser_id(null);
        assertEquals(expectedResponse, response.getBody());
    }

    @Test
    public void testLogin_Success() {
        // Cria um LoginDTO de exemplo
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUsername("Luiz");
        loginDTO.setPassword("1234");

        // Mock do UserRepository para retornar um objeto UserEntity ao buscar por username
        when(userRepository.findByUsernameAndPassword("Luiz", "1234")).thenReturn(Optional.of(new UserEntity()));

        // Chama o método que você deseja testar
        ResponseEntity response = userService.login(loginDTO);

        // Verifica se a resposta é a esperada
        assertEquals(HttpStatus.OK, response.getStatusCode());
        UserResponseDTO expectedResponse = new UserResponseDTO();
        expectedResponse.setMessage("Logged");
        expectedResponse.setUser_id(null);
        assertEquals(expectedResponse, response.getBody());
    }

    @Test
    public void testLogin_Failure() {
        // Cria um LoginDTO de exemplo
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUsername("Luiz");
        loginDTO.setPassword("password");

        // Mock do UserRepository para retornar Optional.empty() ao buscar por username
        when(userRepository.findByUsernameAndPassword("Luiz", "4321")).thenReturn(Optional.empty());

        // Chama o método que você deseja testar
        ResponseEntity response = userService.login(loginDTO);

        // Verifica se a resposta é a esperada
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Username or password incorrect", response.getBody());
    }
}
