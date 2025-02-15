package com.github.psinalberth.education.exam.adapter.web.resource;

import com.github.psinalberth.education.commons.data.Identity;
import com.github.psinalberth.education.commons.function.Action;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;
import lombok.experimental.UtilityClass;

import java.util.Optional;

@UtilityClass
public class WebResourceUtils {

    public <T extends Identity<?>> Response created(Class<?> resource, T body) {
        var uri = UriBuilder.fromResource(resource).path(body.id().toString()).build();
        return Response.created(uri).entity(body).build();
    }

    @SuppressWarnings("OptionalUsedAsFieldOrParameterType")
    public <T> Response successOrNotFound(Optional<T> body) {
        return body.map(result -> Response.ok(result).build())
                .orElseGet(() -> Response.status(Response.Status.NOT_FOUND).build());
    }

    public Response noContent(Action action) {
        action.execute();
        return Response.noContent().build();
    }
}
