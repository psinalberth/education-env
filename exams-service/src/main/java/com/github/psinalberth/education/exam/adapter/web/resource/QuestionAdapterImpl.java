package com.github.psinalberth.education.exam.adapter.web.resource;

import com.github.psinalberth.education.exam.domain.model.question.QuestionDto;
import com.github.psinalberth.education.exam.domain.service.QuestionAdapter;
import jakarta.inject.Singleton;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import java.util.List;

@Singleton
public class QuestionAdapterImpl implements QuestionAdapter {

    private final QuestionClient client;

    public QuestionAdapterImpl(@RestClient QuestionClient client) {
        this.client = client;
    }

    @Override
    public List<QuestionDto> getQuestions() {
        return client.getQuestions();
    }
}
