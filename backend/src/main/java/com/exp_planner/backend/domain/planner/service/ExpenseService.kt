package com.exp_planner.backend.domain.planner.service;

import com.exp_planner.backend.domain.planner.dto.ExpenseDto;
import com.exp_planner.backend.domain.planner.entity.Expense;
import com.exp_planner.backend.domain.planner.mapper.ExpenseMapper;
import com.exp_planner.backend.domain.planner.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepository repository;
    private final ExpenseMapper mapper;

    @Transactional
    public Expense createExpense(ExpenseDto.Post requestDto) {
        Expense expense = mapper.expensePostDtoToExpense(requestDto);
        return repository.save(expense);
    }
}
