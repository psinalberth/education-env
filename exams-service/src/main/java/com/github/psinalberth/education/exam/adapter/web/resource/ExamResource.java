package com.github.psinalberth.education.exam.adapter.web.resource;

import com.github.psinalberth.education.commons.data.PagedRequest;
import com.github.psinalberth.education.exam.domain.model.exam.CreateExamDto;
import com.github.psinalberth.education.exam.domain.model.exam.UpdateExamDto;
import com.github.psinalberth.education.exam.domain.service.ExamService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;

@Path("/v1/exams")
@ApplicationScoped
@RequiredArgsConstructor
public class ExamResource implements ExamResourceOpenApi {

    private final ExamService examService;

    public Response create(CreateExamDto request) {
        var exam = examService.create(request);
        return WebResourceUtils.created(ExamResource.class, exam);
    }

    @Override
    public Response update(Long examId, UpdateExamDto request) {
        var exam = examService.update(request.withExamId(examId));
        return Response.ok(exam).build();
    }

    @Override
    public Response findById(Long examId) {
        return Response.ok(examService.findById(examId)).build();
    }

    @Override
    public Response findAll(Integer page, Integer pageSize) {
        return Response.ok(examService.findAll(new PagedRequest(page, pageSize))).build();
    }

    @Override
    public Response delete(Long examId) {
        return WebResourceUtils.noContent(() -> examService.delete(examId));
    }

    @Override
    public Response publish(Long examId) {
        return WebResourceUtils.noContent(() -> examService.publish(examId));
    }
}
