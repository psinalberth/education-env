package com.github.psinalberth.education.exam.adapter.persistence;

import com.github.psinalberth.education.commons.data.PagedData;
import com.github.psinalberth.education.commons.data.PagedRequest;
import com.github.psinalberth.education.exam.domain.model.exam.CreateExamDto;
import com.github.psinalberth.education.exam.domain.model.exam.ExamDto;
import com.github.psinalberth.education.exam.domain.model.exam.SimpleExamDto;
import com.github.psinalberth.education.exam.domain.model.exam.UpdateExamDto;
import com.github.psinalberth.education.exam.domain.repository.ExamRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Parameters;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Singleton
@RequiredArgsConstructor
public class ExamPanacheRepositoryImpl implements ExamRepository, PanacheRepository<ExamEntity> {

    private final ExamDatabaseMapper mapper;

    @Override
    @Transactional
    public ExamDto save(final CreateExamDto exam) {
        log.info("Saving new exam {}", exam);
        var entity = mapper.toEntity(exam);
        persist(entity);

        return mapper.toDomain(entity);
    }

    @Override
    @Transactional
    public ExamDto update(UpdateExamDto dto) {
        log.info("Updating exam {}", dto.examId());
        return findByIdOptional(dto.examId())
                .map(entity -> mapper.toEntity(entity, dto))
                .map(entity -> {
                    persist(entity);
                    return entity;
                })
                .map(mapper::toDomain)
                .orElseThrow();
    }

    @Override
    public Optional<ExamDto> getById(final Long examId) {
        log.info("Fetching exam with id = {}", examId);
        return findByIdOptional(examId)
                .map(mapper::toDomain);
    }

    @Override
    public PagedData<SimpleExamDto> getAll(final PagedRequest pagedRequest) {
        log.info("Fetching exams list");
        var query = findAll().page(Page.of(pagedRequest.page() - 1, pagedRequest.pageSize()));
        var examsCount = query.pageCount();
        var data = query
                .stream().map(mapper::toDto)
                .toList();

        return new PagedData<>(data, pagedRequest.page(), pagedRequest.pageSize(), examsCount);
    }

    @Override
    @Transactional
    public void delete(final Long examId) {
        log.info("Removing exam with id = {}", examId);
        deleteById(examId);
    }

    @Override
    @Transactional
    public void publish(final Long examId) {
        update(
                "published = true, " +
                        "updatedAt = :updatedAt " +
                        "where id = :id",
                Parameters.with("id", examId)
                        .and("updatedAt", LocalDateTime.now())
        );
    }
}
