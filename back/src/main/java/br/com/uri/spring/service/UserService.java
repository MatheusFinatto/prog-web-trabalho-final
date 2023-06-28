package br.com.uri.spring.service;

import br.com.uri.spring.dto.LoginDTO;
import br.com.uri.spring.dto.UserResponseDTO;
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

    public ResponseEntity<UserResponseDTO> saveObject(UserDTO userDTO) {
        UserEntity userEntity = new UserEntity();

        // Criar o usuário
        userEntity.setUsername(userDTO.getUsername());
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setPassword(userDTO.getPassword());

        userRepository.save(userEntity);
        if (userEntity != null){
            UserResponseDTO responseDTO = new UserResponseDTO();
            responseDTO.setMessage("Created");
            responseDTO.setUser_id(userEntity.getId());

            return ResponseEntity.ok(responseDTO);
        } else {
            UserResponseDTO userResponseDTO = new UserResponseDTO();
            userResponseDTO.setMessage("It was not possible to create your user");
            userResponseDTO.setUser_id(null);
            return new ResponseEntity(userResponseDTO, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<UserResponseDTO> login(LoginDTO loginDTO) {
        Optional<UserEntity> userEntity = userRepository.findByUsernameAndPassword(loginDTO.getUsername(), loginDTO.getPassword());
        if (userEntity.isPresent()) {
            UserResponseDTO responseDTO = new UserResponseDTO();
            responseDTO.setMessage("Logged");
            responseDTO.setUser_id(userEntity.get().getId());

            return ResponseEntity.ok(responseDTO);
        } else {
            return new ResponseEntity("Username or password incorrect", HttpStatus.UNAUTHORIZED);
        }
    }
    
}
