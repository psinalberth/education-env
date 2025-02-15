package com.github.psinalberth.education.exam.domain.model.exam;

import java.time.LocalDateTime;

public record UpdateExamDto(Long examId, String title, LocalDateTime date) {

    public UpdateExamDto withExamId(Long examId) {
        return new UpdateExamDto(examId, title(), date());
    }
}
