package com.github.psinalberth.education.question.domain.model

data class Question(
    val id: String,
    val text: String,
    val options: List<QuestionOption>
)
