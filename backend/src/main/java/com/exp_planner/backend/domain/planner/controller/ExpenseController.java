package com.exp_planner.backend.domain.planner.controller;

import com.exp_planner.backend.domain.planner.dto.ExpenseDto;
import com.exp_planner.backend.domain.planner.entity.Expense;
import com.exp_planner.backend.domain.planner.mapper.ExpenseMapper;
import com.exp_planner.backend.domain.planner.service.ExpenseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/exp/expenses")
@RequiredArgsConstructor
// docs
@Tag(name = "Expense", description = "지출 api")
// logs
@Slf4j
public class ExpenseController {
    private final ExpenseService service;
    private final ExpenseMapper mapper;

    @Operation(summary = "Expense post api", description = "지출 내역 등록")
    @PostMapping("/post")
    public ResponseEntity<ExpenseDto.Response> postExpense(@RequestBody ExpenseDto.Post postDto) {
        Expense savedExpense = service.createExpense(postDto);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedExpense.getId())
                .toUri();

        return ResponseEntity.created(location).body(mapper.expenseToExpenseResponseDto(savedExpense));
    }
}
