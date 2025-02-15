package com.github.psinalberth.education.question.domain.service

import com.github.psinalberth.education.question.domain.dto.request.CreateQuestionDto
import com.github.psinalberth.education.question.domain.model.Question
import com.github.psinalberth.education.question.domain.repository.QuestionRepository
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class QuestionService(
    private val repository: QuestionRepository
) {

    private val log = LoggerFactory.getLogger(javaClass)

    fun create(question: CreateQuestionDto): Question {
        log.info("Saving question $question")
        return repository.save(question)
    }

    fun findAll(): List<Question>  {
        log.info("Fetching questions")
        return repository.findAll();
    }
}