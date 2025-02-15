package com.github.psinalberth.education.exam.domain.model.exam;

import com.github.psinalberth.education.exam.domain.model.question.QuestionDto;
import com.github.psinalberth.education.commons.data.Identity;

import java.time.LocalDateTime;
import java.util.List;

public record ExamDto(
        String id,
        String title,
        LocalDateTime createdAt,
        List<QuestionDto> questions
) implements Identity<String> {
}
