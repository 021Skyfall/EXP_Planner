package com.exp_planner.backend.slice.planner.controller;

import com.exp_planner.backend.domain.planner.controller.ExpenseController;
import com.exp_planner.backend.domain.planner.dto.ExpenseDto;
import com.exp_planner.backend.domain.planner.entity.Expense;
import com.exp_planner.backend.domain.planner.service.ExpenseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.*;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ExpenseController.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ExpenseControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ExpenseService service;

    @Autowired
    private ObjectMapper mapper;

    @BeforeEach
    void setup() {
        mapper.registerModule(new JavaTimeModule());
        // 오브젝트 매퍼에 날짜/시간 타입을 어떻게 json으로 변환할 지 주입
    }

    @Test
    @DisplayName("postExpense 테스트")
    @Order(1)
    void postExpenseTest() throws Exception {
        // given
        ExpenseDto.Post postDto = new ExpenseDto.Post(
                "테스트 게임",
                "PC",
                50000,
                LocalDate.now(),
                "카드",
                "Steam",
                null
        );

        Expense mockExpense = new Expense();
        Mockito.when(service.createExpense(any(ExpenseDto.Post.class))).thenReturn(mockExpense);

        // when
        mockMvc.perform(post("/exp/expenses/post")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(postDto)))
                .andExpect(status().isCreated()); // then
    }
}
