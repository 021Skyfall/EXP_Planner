package com.exp_planner.backend.domain.planner.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE) // 객체로 만들 필요 없으니 private
public class ExpenseDto {

    @Getter
    @NoArgsConstructor
    public static class Post {
        private String gameName;
        private String gameType;
        private Integer amount;
        private LocalDate paymentDate;
        private String paymentMethod;
        private String marketType;
        private String description;
    }

    @Getter
    @NoArgsConstructor
    public static class Response {
        private Long id;
        private String gameName;
        private String gameType;
        private Integer amount;
        private LocalDate paymentDate;
        private String paymentMethod;
        private String marketType;
        private String description;
    }
}
