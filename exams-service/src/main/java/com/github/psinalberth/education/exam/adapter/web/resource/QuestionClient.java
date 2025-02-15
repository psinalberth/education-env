package com.github.psinalberth.education.exam.adapter.web.resource;

import com.github.psinalberth.education.exam.domain.model.question.QuestionDto;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import java.util.List;

@RegisterRestClient(configKey = "questions-service")
public interface QuestionClient {

    @GET
    @Path("/v1/questions")
    @Produces(MediaType.APPLICATION_JSON)
    List<QuestionDto> getQuestions();
}
