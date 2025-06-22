package com.exp_planner.backend.domain.planner.dto

import java.time.LocalDate

class ExpenseDto {
    data class Post(
        val gameName: String,
        val gameType: String,
        val amount: Int,
        val paymentDate: LocalDate,
        val paymentMethod: String?, // null 가능 필드는 ?
        val marketType: String,
        val description: String?
    )

    data class Response(
        val id: Long,
        val gameName: String,
        val gameType: String,
        val amount: Int,
        val paymentDate: LocalDate,
        val paymentMethod: String?,
        val marketType: String,
        val description: String?
    )
}