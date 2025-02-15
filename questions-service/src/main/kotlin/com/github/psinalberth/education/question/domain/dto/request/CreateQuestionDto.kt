package com.github.psinalberth.education.question.domain.dto.request

data class CreateQuestionDto(
    val text: String,
    val options: List<QuestionOptionDto>
)
