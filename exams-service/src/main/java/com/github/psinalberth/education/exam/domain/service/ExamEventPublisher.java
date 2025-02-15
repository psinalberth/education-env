package com.github.psinalberth.education.exam.domain.service;

import com.github.psinalberth.education.exam.domain.model.exam.ExamPublished;

public interface ExamEventPublisher {

    void sendEvent(final ExamPublished event);
}
