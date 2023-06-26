package br.com.uri.spring.service;

import org.springframework.stereotype.Service;

import br.com.uri.spring.dto.UserDTO;
import br.com.uri.spring.entities.UserEntity;
import br.com.uri.spring.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void saveObject(UserDTO userDTO) {
        UserEntity userEntity = new UserEntity();

        // Criar o usuário
        userEntity.setUsername(userDTO.getUsername());
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setPassword(userDTO.getPassword());

        userRepository.save(userEntity);
    }
    
}
