package br.com.uri.spring.entities;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
@Table(name = "todos")
public class ToDoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column
    private String title;

    @OneToOne
    private Integer user_id;

    @Column
    private Boolean completed;

}
