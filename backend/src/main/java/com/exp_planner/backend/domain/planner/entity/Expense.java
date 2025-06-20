package com.exp_planner.backend.domain.planner.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "expenses")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Expense {

    // 변수 타입은 전부 래퍼 타입 => null 처리
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expense_id")
    private Long id; // pk

    @Column(nullable = false, length = 100)
    private String gameName;

    @Column(nullable = false, length = 50)
    private String gameType; // 모바일 or 콘솔 or pc

    @Column(nullable = false)
    private Integer amount;

    @Column(nullable = false)
    private LocalDate paymentDate;

    @Column(length = 50)
    private String paymentMethod;

    @Column(nullable = false, length = 50)
    private String marketType; // 삼성스토어 or 원스토어 or 구플 or etc

    @Column(columnDefinition = "TEXT")
    private String description; // 메모
}
