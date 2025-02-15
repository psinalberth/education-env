package com.github.psinalberth.education.exam.adapter.persistence;

import com.github.psinalberth.education.exam.domain.model.exam.CreateExamDto;
import com.github.psinalberth.education.exam.domain.model.exam.ExamDto;
import com.github.psinalberth.education.exam.domain.model.exam.UpdateExamDto;
import com.github.psinalberth.education.exam.domain.model.question.QuestionDto;
import com.github.psinalberth.education.exam.domain.model.question.QuestionOptionDto;
import com.github.psinalberth.education.exam.domain.model.exam.SimpleExamDto;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.time.LocalDateTime;
import java.util.UUID;

@Mapper(
        componentModel = "cdi",
        imports = {LocalDateTime.class},
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED
)
public interface ExamDatabaseMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "externalId", expression = "java(mapExternalId())")
    ExamEntity toEntity(CreateExamDto exam);

    @Mapping(target = "id", ignore = true)
    ExamEntity toEntity(@MappingTarget ExamEntity entity, UpdateExamDto dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "externalId", expression = "java(mapExternalId())")
    @Mapping(target = "createdAt", expression = "java(LocalDateTime.now())")
    QuestionEntity toEntity(QuestionDto question);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "externalId", expression = "java(mapExternalId())")
    @Mapping(target = "createdAt", expression = "java(LocalDateTime.now())")
    QuestionOptionEntity toEntity(QuestionOptionDto option);

    @Mapping(target = "id", source = "externalId")
    ExamDto toDomain(ExamEntity entity);

    @Mapping(target = "id", source = "externalId")
    SimpleExamDto toDto(ExamEntity entity);

    default String mapExternalId() {
        return UUID.randomUUID().toString();
    }
}
