package com.github.psinalberth.education.exam.domain.model.exam;

import com.github.psinalberth.education.exam.domain.model.question.QuestionDto;

import java.time.LocalDateTime;
import java.util.List;

public record CreateExamDto(
        String title,
        LocalDateTime date,
        List<QuestionDto> questions
) {

    public CreateExamDto withQuestions(final List<QuestionDto> questions) {
        return new CreateExamDto(title(), date(), questions);
    }
}
