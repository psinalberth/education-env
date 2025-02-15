package com.github.psinalberth.education.exam.domain.model.question;

public record QuestionOptionDto(
        String id,
        String text,
        boolean isAnswer
) {
}
