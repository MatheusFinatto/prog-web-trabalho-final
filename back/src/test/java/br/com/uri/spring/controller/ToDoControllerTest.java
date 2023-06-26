package br.com.uri.spring.controller;

import br.com.uri.spring.dto.UserDTO;
import br.com.uri.spring.dto.ToDoDTO;
import br.com.uri.spring.service.ToDoServiceTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = ToDoController.class)
public class ToDoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ToDoServiceTest personService;

    @Test
    public void givenAValidRequestWhenCreatingPersonThenShouldReturnOk() throws Exception {
        String URI = "/v1/todos";

        ToDoDTO content = buildMockPayload();

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post(URI)
                .content(objectMapper.writeValueAsString(content))
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isAccepted());
    }

    private ToDoDTO buildMockPayload() {
        ToDoDTO toDo = new ToDoDTO();
        toDo.setTitle("Learn Cobol");
        toDo.setCompleted(false);
        return toDo;
    }

}
