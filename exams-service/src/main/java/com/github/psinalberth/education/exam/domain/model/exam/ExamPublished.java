package com.github.psinalberth.education.exam.domain.model.exam;

import com.github.psinalberth.education.commons.event.DomainEvent;

import java.time.LocalDateTime;

public record ExamPublished(
        String examId,
        String title,
        LocalDateTime createdAt
) implements DomainEvent {

    public ExamPublished(String examId, String title) {
        this(examId, title, LocalDateTime.now());
    }
}
