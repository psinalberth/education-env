package com.github.psinalberth.education.exam;

import jakarta.ws.rs.core.Application;
import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Info;

@OpenAPIDefinition(
        info = @Info(
                title = "Exams API",
                version = "0.0.1")
)
public class ExamApplication extends Application {
}
