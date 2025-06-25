package com.exp_planner.backend.unit.planner.service

import com.exp_planner.backend.domain.planner.dto.ExpenseDto
import com.exp_planner.backend.domain.planner.entity.Expense
import com.exp_planner.backend.domain.planner.mapper.ExpenseMapper
import com.exp_planner.backend.domain.planner.repository.ExpenseRepository
import com.exp_planner.backend.domain.planner.service.ExpenseService
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.junit.jupiter.MockitoExtension
import org.mockito.kotlin.any
import org.mockito.kotlin.given
import org.mockito.kotlin.times
import org.mockito.kotlin.verify
import java.time.LocalDate

@ExtendWith(MockitoExtension::class)
internal class ExpenseServiceTest {
    @InjectMocks
    private lateinit var service: ExpenseService

    @Mock
    private lateinit var repository: ExpenseRepository

    @Mock
    private lateinit var mapper: ExpenseMapper

    @Test
    @DisplayName("createExpense 테스트")
    fun createExpenseTest() {
        // given
        val postDto = ExpenseDto.Post(
            "테스트 게임", "PC", 10000, LocalDate.now(), "카드", "Steam", null
        )
        val mockExpense = Expense()
        val mockSavedExpense = Expense()

        given(mapper.expensePostDtoToExpense(any())).willReturn(mockExpense)
        given(repository.save(any<Expense>())).willReturn(mockSavedExpense)

        val result = service.createExpense(postDto)

        assertThat(result).isNotNull
        assertThat(result).isEqualTo(mockSavedExpense)

        verify(repository, times(1)).save(any())
    }
}