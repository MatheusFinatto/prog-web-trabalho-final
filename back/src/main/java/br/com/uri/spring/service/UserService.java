package br.com.uri.spring.service;

import br.com.uri.spring.dto.LoginDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.uri.spring.dto.UserDTO;
import br.com.uri.spring.entities.UserEntity;
import br.com.uri.spring.repositories.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity saveObject(UserDTO userDTO) {
        UserEntity userEntity = new UserEntity();

        // Criar o usuário
        userEntity.setUsername(userDTO.getUsername());
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setPassword(userDTO.getPassword());

        userRepository.save(userEntity);
        if (userEntity != null){
            return new ResponseEntity("Created",HttpStatus.CREATED);
        } else {
            return new ResponseEntity("It was not possible to create your user", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity login(LoginDTO loginDTO) {
        Optional<UserEntity> userEntity = userRepository.findByUsername(loginDTO.getUsername());
        if (userEntity != null) {
            return new ResponseEntity("Logged",HttpStatus.OK);
        } else {
            return new ResponseEntity("Username or password incorrect", HttpStatus.UNAUTHORIZED);
        }
    }
    
}
