package com.github.psinalberth.education.question.domain

import com.github.psinalberth.education.question.adapter.persistence.QuestionEntity
import com.github.psinalberth.education.question.adapter.persistence.QuestionOptionEntity
import com.github.psinalberth.education.question.domain.dto.request.CreateQuestionDto
import com.github.psinalberth.education.question.domain.dto.request.QuestionOptionDto
import com.github.psinalberth.education.question.domain.model.Question
import com.github.psinalberth.education.question.domain.model.QuestionOption
import java.time.LocalDateTime
import java.util.*

object QuestionMapper {

    fun toEntity(dto: CreateQuestionDto): QuestionEntity =
        with(dto) {
            val entity = QuestionEntity(
                text = text,
                externalId = UUID.randomUUID().toString(),
                createdAt = LocalDateTime.now()
            )

            entity.options = dto.options.map { toEntity(entity, it) }

            return entity
        }

    private fun toEntity(question: QuestionEntity, dto: QuestionOptionDto): QuestionOptionEntity =
        with(dto) {
            QuestionOptionEntity(
                text = text,
                isAnswer = isAnswer,
                question = question,
                externalId = UUID.randomUUID().toString(),
                createdAt = LocalDateTime.now()
            )
        }

    fun toDto(entity: QuestionEntity): Question =
        with(entity) {
            Question(
                id = externalId,
                text = text,
                options = options!!.map(::toDto)
            )
        }

    private fun toDto(entity: QuestionOptionEntity): QuestionOption =
        with(entity) {
            QuestionOption(
                id = externalId,
                text = text,
                isAnswer = isAnswer
            )
        }
}