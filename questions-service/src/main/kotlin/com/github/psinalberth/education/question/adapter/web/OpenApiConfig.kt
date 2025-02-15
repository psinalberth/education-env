package com.github.psinalberth.education.question.adapter.web

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Info
import org.springframework.context.annotation.Configuration

@Configuration
@OpenAPIDefinition(
    info = Info(
        title = "Questions Service",
        description = "Service responsible for questions management",
        version = "1.0.0"
    )
)
class OpenApiConfig