package com.github.psinalberth.education.question.adapter.web

import com.github.psinalberth.education.question.domain.dto.request.CreateQuestionDto
import com.github.psinalberth.education.question.domain.model.Question
import com.github.psinalberth.education.question.domain.service.QuestionService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.util.UriComponentsBuilder

@RestController
@RequestMapping("/v1/questions")
class QuestionController(
    private val questionService: QuestionService
) : QuestionControllerApi {

    @PostMapping
    override fun create(@RequestBody request: CreateQuestionDto): ResponseEntity<Question> {
        return questionService.create(request)
            .let {
                ResponseEntity.created(UriComponentsBuilder.fromPath("/questions/{id}").build(it.id))
                    .body(it)
            }
    }

    @GetMapping
    override fun findAll(): ResponseEntity<List<Question>> =
        questionService.findAll()
            .let { ResponseEntity.ok(it) }
}