package com.github.psinalberth.education.question.domain.repository

import com.github.psinalberth.education.question.domain.dto.request.CreateQuestionDto
import com.github.psinalberth.education.question.domain.model.Question

interface QuestionRepository {

    fun save(question: CreateQuestionDto): Question

    fun findById(id: String): Question?

    fun findAll(): List<Question>
}