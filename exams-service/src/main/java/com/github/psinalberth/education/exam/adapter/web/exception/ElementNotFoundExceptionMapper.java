package com.github.psinalberth.education.exam.adapter.web.exception;

import com.github.psinalberth.education.commons.exception.ElementNotFoundException;
import com.github.psinalberth.education.exam.adapter.web.model.ResponseError;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Provider
public class ElementNotFoundExceptionMapper implements ExceptionMapper<ElementNotFoundException> {

    @Override
    public Response toResponse(ElementNotFoundException e) {
        log.error("ElementNotFoundException: {}", e.getMessage());
        var status = Response.Status.NOT_FOUND;
        return Response.status(status)
                .entity(new ResponseError(status.getStatusCode(), e.getMessage()))
                .build();
    }
}
