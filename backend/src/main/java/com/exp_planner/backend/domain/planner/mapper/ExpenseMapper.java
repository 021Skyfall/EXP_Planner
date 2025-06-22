package com.exp_planner.backend.domain.planner.mapper;

import com.exp_planner.backend.domain.planner.dto.ExpenseDto;
import com.exp_planner.backend.domain.planner.entity.Expense;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ExpenseMapper {
    Expense expensePostDtoToExpense(ExpenseDto.Post requestBody);

    ExpenseDto.Response expenseToExpenseResponseDto(Expense expense);
}
