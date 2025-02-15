package com.github.psinalberth.education.exam.adapter.web.model;

import java.time.LocalDateTime;

public record ResponseError(
        int status,
        String message,
        LocalDateTime timestamp
) {

    public ResponseError(int status, String message) {
        this(status, message, LocalDateTime.now());
    }
}
