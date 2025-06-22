package com.exp_planner.backend.domain.planner.service

import com.exp_planner.backend.domain.planner.dto.ExpenseDto
import com.exp_planner.backend.domain.planner.entity.Expense
import com.exp_planner.backend.domain.planner.mapper.ExpenseMapper
import com.exp_planner.backend.domain.planner.repository.ExpenseRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class ExpenseService( // 생성자 주입 @RequiredArgsConstructor
    private val expenseRepository: ExpenseRepository,
    private val expenseMapper: ExpenseMapper
) {

    @Transactional
    fun createExpense(requestDto: ExpenseDto.Post) : Expense {
        val expense = expenseMapper.expensePostDtoToExpense(requestDto)
        return expenseRepository.save(expense)
    }
}