package com.github.psinalberth.education.exam.adapter.web.resource;

import com.github.psinalberth.education.commons.data.PagedData;
import com.github.psinalberth.education.exam.adapter.web.model.CreateExamDtoSchema;
import com.github.psinalberth.education.exam.domain.model.exam.CreateExamDto;
import com.github.psinalberth.education.exam.domain.model.exam.ExamDto;
import com.github.psinalberth.education.exam.domain.model.exam.UpdateExamDto;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/v1/exams")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Exams", description = "Responsible for exams management")
public interface ExamResourceOpenApi {

    @POST
    @Operation(summary = "Creates a new exam")
    @APIResponse(responseCode = "201", content = @Content(schema = @Schema(implementation = ExamDto.class)))
    @RequestBody(content = @Content(schema = @Schema(name = "CreateExamDtoSchema", implementation = CreateExamDtoSchema.class)))
    Response create(CreateExamDto request);

    @PUT
    @Path("/{id}")
    @Operation(summary = "Updates exam")
    @APIResponse(responseCode = "204", content = @Content(schema = @Schema(implementation = ExamDto.class)))
    @RequestBody(content = @Content(schema = @Schema(name = "UpdateExamDtoSchema", implementation = CreateExamDtoSchema.class)))
    Response update(@PathParam("id") Long examId, UpdateExamDto request);

    @GET
    @Path("/{id}")
    @Operation(summary = "Get exam by id")
    @APIResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = ExamDto.class)))
    Response findById(@PathParam("id") Long examId);

    @GET
    @Operation(summary = "Get all exams")
    @APIResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = PagedData.class)))
    Response findAll(@QueryParam("page")
                     @Parameter(name = "page", example = "1") Integer page,
                     @QueryParam("pageSize")
                     @Parameter(name = "pageSize", example = "10") Integer pageSize
    );

    @DELETE
    @Path("/{id}")
    @Operation(summary = "Deletes exam by id")
    @APIResponse(responseCode = "204", description = "Exam deleted successfully")
    Response delete(@PathParam("id") Long examId);

    @PUT
    @Path("/{id}/publish")
    @Operation(summary = "Publishes exam to be available to subscription")
    @APIResponse(responseCode = "204", description = "Exam published successfully")
    Response publish(@PathParam("id") Long examId);
}
