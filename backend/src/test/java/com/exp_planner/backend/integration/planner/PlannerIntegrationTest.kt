package com.exp_planner.backend.integration.planner

import com.exp_planner.backend.domain.planner.dto.ExpenseDto
import com.exp_planner.backend.domain.planner.repository.ExpenseRepository
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.header
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate


@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@TestMethodOrder(MethodOrderer.OrderAnnotation::class)
class PlannerIntegrationTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var mapper: ObjectMapper

    @Autowired
    private lateinit var repository: ExpenseRepository

    @BeforeEach
    fun setUp() {
        mapper.registerModule(JavaTimeModule())
    }

    @Test
    @DisplayName("postExpense 통합 테스트")
    fun postExpenseIntegrationTest() {
        // given
        val postRequest = ExpenseDto.Post(
            gameName = "명조",
            gameType = "모바일",
            amount = 119000,
            paymentDate = LocalDate.of(2025, 6, 25),
            paymentMethod = "컬쳐랜드",
            marketType = "삼성 스토어",
            description = "1 트럭"
        )

        // when
        val resultAction = mockMvc.perform(
            post("/exp/expenses/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(postRequest))
        )

        // then
        // http 응답
        resultAction
            .andExpect(status().isCreated)
            .andExpect(header().exists("Location"))
            .andExpect(jsonPath("$.id").exists())

        // db
        val allExpenses = repository.findAll()
        assertThat(allExpenses).hasSize(1)
        val savedExpense = allExpenses[0]
        assertThat(savedExpense.gameName).isEqualTo("명조")
        assertThat(savedExpense.gameType).isEqualTo("모바일")
        assertThat(savedExpense.amount).isEqualTo(119000)
        assertThat(savedExpense.paymentDate).isEqualTo(LocalDate.of(2025, 6, 25))
        assertThat(savedExpense.paymentMethod).isEqualTo("컬쳐랜드")
        assertThat(savedExpense.marketType).isEqualTo("삼성 스토어")
        assertThat(savedExpense.description).isEqualTo("1 트럭")
    }
}
