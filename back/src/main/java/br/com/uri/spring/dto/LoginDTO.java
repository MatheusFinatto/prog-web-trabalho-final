package br.com.uri.spring.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class LoginDTO {

    @NotNull
    private String username;

    @NotNull
    private String password;


}
