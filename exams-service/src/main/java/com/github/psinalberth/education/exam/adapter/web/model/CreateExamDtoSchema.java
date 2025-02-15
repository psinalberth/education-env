package com.github.psinalberth.education.exam.adapter.web.model;

import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.time.LocalDateTime;

public record CreateExamDtoSchema(
        @Schema(example = "2024 Finals", required = true)
        String title,
        @Schema(example = "2024-12-15T13:00:00", required = true)
        LocalDateTime date) {
}
