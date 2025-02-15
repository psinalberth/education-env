package com.github.psinalberth.education.commons.data;

public record PagedRequest(
        Integer page,
        Integer pageSize
) {
}
