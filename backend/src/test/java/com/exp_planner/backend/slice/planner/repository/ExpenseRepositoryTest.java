package com.exp_planner.backend.slice.planner.repository;

import com.exp_planner.backend.domain.planner.entity.Expense;
import com.exp_planner.backend.domain.planner.repository.ExpenseRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ExpenseRepositoryTest {
    @Autowired
    private ExpenseRepository repository;

    @Test
    @DisplayName("saveExpense DB 테스트")
    @Order(1)
    void saveExpenseTest() {
        // given
        Expense expense = Expense.builder()
                .gameName("테스트 게임")
                .gameType("PC")
                .amount(10000)
                .paymentDate(LocalDate.now())
                .paymentMethod("신용카드")
                .marketType("Steam")
                .description("테스트 메모")
                .build();

        // when
        Expense savedExpense = repository.save(expense);

        // then
        assertThat(savedExpense).isNotNull();
        assertThat(savedExpense.getId()).isNotNull();
        assertThat(savedExpense.getGameName()).isEqualTo("테스트 게임");
        assertThat(savedExpense.getGameType()).isEqualTo("PC");
        assertThat(savedExpense.getAmount()).isEqualTo(10000);
        assertThat(savedExpense.getPaymentMethod()).isEqualTo("신용카드");
        assertThat(savedExpense.getMarketType()).isEqualTo("Steam");
        assertThat(savedExpense.getDescription()).isEqualTo("테스트 메모");
    }
}
