package com.github.psinalberth.education.question.adapter.web

import com.github.psinalberth.education.question.domain.dto.request.CreateQuestionDto
import com.github.psinalberth.education.question.domain.model.Question
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.parameters.RequestBody
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.ResponseEntity

@Tag(name = "Questions", description = "Responsible for questions management")
interface QuestionControllerApi {

    @Operation(summary = "Creates a new question")
    @ApiResponse(responseCode = "201", useReturnTypeSchema = true)
    @RequestBody(useParameterTypeSchema = true)
    fun create(request: CreateQuestionDto): ResponseEntity<Question>


    @Operation(summary = "List all questions")
    fun findAll(): ResponseEntity<List<Question>>
}