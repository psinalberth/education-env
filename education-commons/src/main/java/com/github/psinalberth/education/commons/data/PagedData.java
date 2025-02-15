package com.github.psinalberth.education.commons.data;

import java.util.List;

public record PagedData<T>(
        List<T> data,
        Integer page,
        Integer pageSize,
        Integer totalPages
) {
}
