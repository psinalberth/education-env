package com.github.psinalberth.education.exam.domain.repository;

import com.github.psinalberth.education.commons.data.PagedRequest;
import com.github.psinalberth.education.exam.domain.model.exam.CreateExamDto;
import com.github.psinalberth.education.exam.domain.model.exam.ExamDto;
import com.github.psinalberth.education.exam.domain.model.exam.SimpleExamDto;
import com.github.psinalberth.education.exam.domain.model.exam.UpdateExamDto;
import com.github.psinalberth.education.commons.data.PagedData;

import java.util.Optional;

public interface ExamRepository {

    ExamDto save(final CreateExamDto dto);

    ExamDto update(final UpdateExamDto dto);

    Optional<ExamDto> getById(final Long examId);

    PagedData<SimpleExamDto> getAll(final PagedRequest request);

    void delete(final Long examId);

    void publish(final Long examId);
}
