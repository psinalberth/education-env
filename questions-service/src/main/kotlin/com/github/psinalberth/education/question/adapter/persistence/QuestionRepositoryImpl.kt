package com.github.psinalberth.education.question.adapter.persistence

import com.github.psinalberth.education.question.domain.QuestionMapper
import com.github.psinalberth.education.question.domain.dto.request.CreateQuestionDto
import com.github.psinalberth.education.question.domain.model.Question
import com.github.psinalberth.education.question.domain.repository.QuestionRepository
import org.springframework.stereotype.Repository

@Repository
class QuestionRepositoryImpl(private val delegate: QuestionDatabaseRepository) : QuestionRepository {

    override fun save(question: CreateQuestionDto): Question {
        return QuestionMapper.toEntity(question)
            .let(delegate::save)
            .let(QuestionMapper::toDto)

    }

    override fun findById(id: String): Question? {
        return delegate.findByExternalId(id)
            ?.let(QuestionMapper::toDto)
    }

    override fun findAll(): List<Question> {
        return delegate.findAll()
            .map(QuestionMapper::toDto)
    }
}