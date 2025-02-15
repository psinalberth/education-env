package com.github.psinalberth.education.exam.domain.model.question;

import java.util.List;

public record QuestionDto(
        String id,
        String text,
        List<QuestionOptionDto> options
) {
}
