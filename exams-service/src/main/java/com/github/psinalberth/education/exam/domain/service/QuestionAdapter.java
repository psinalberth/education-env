package com.github.psinalberth.education.exam.domain.service;

import com.github.psinalberth.education.exam.domain.model.question.QuestionDto;

import java.util.List;

public interface QuestionAdapter {

    List<QuestionDto> getQuestions();
}
