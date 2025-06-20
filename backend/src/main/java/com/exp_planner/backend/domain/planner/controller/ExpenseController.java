package com.exp_planner.backend.domain.planner.controller;

import com.exp_planner.backend.domain.planner.dto.ExpenseDto;
import com.exp_planner.backend.domain.planner.entity.Expense;
import com.exp_planner.backend.domain.planner.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/exp/expenses")
@RequiredArgsConstructor
@Slf4j
public class ExpenseController {
    private final ExpenseService service;

    @PostMapping("/post")
    public ResponseEntity<Void> postExpense(@RequestBody ExpenseDto.Post postDto) {
        Expense savedExpense = service.createExpense(postDto);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedExpense.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }
}
