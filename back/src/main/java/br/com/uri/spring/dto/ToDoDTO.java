package br.com.uri.spring.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class ToDoDTO {

    @NotNull
    private String title;

    private boolean completed;
}
