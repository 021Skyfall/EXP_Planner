package com.exp_planner.backend.domain.planner.repository;

import com.exp_planner.backend.domain.planner.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
