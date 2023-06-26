package br.com.uri.spring.repositories;

import br.com.uri.spring.entities.ToDoEntity;
import br.com.uri.spring.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findById(Integer id);

    Optional<UserEntity> findByUsername(String username);

}
