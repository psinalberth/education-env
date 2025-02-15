package com.github.psinalberth.education.exam.domain.service;

import com.github.psinalberth.education.commons.data.PagedData;
import com.github.psinalberth.education.commons.data.PagedRequest;
import com.github.psinalberth.education.commons.exception.ElementNotFoundException;
import com.github.psinalberth.education.exam.domain.model.exam.CreateExamDto;
import com.github.psinalberth.education.exam.domain.model.exam.ExamDto;
import com.github.psinalberth.education.exam.domain.model.exam.ExamPublished;
import com.github.psinalberth.education.exam.domain.model.exam.SimpleExamDto;
import com.github.psinalberth.education.exam.domain.model.exam.UpdateExamDto;
import com.github.psinalberth.education.exam.domain.repository.ExamRepository;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;
    private final QuestionAdapter questionAdapter;
    private final ExamEventPublisher eventPublisher;

    public ExamDto create(final CreateExamDto examDto) {
        log.info("Creating new exam {}", examDto);
        var questions = questionAdapter.getQuestions();
        return examRepository.save(examDto.withQuestions(questions));
    }

    public ExamDto update(final UpdateExamDto examDto) {
        log.info("Updating exam {}", examDto);
        return examRepository.update(examDto);
    }

    public ExamDto findById(final Long examId) {
        return examRepository.getById(examId)
                .orElseThrow(() -> new ElementNotFoundException("Exam not found with id " + examId));
    }

    public PagedData<SimpleExamDto> findAll(final PagedRequest request) {
        return examRepository.getAll(request);
    }

    public void delete(Long examId) {
        Optional.ofNullable(findById(examId))
                .ifPresent(unused -> examRepository.delete(examId));
    }

    public void publish(Long examId) {
        Optional.ofNullable(findById(examId))
                .ifPresent(exam -> {
                    examRepository.publish(examId);
                    eventPublisher.sendEvent(new ExamPublished(exam.id(), exam.title()));
                });
    }
}
