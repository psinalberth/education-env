package com.github.psinalberth.education.exam.adapter.message;

import com.github.psinalberth.education.exam.domain.model.exam.ExamPublished;
import com.github.psinalberth.education.exam.domain.service.ExamEventPublisher;
import io.smallrye.reactive.messaging.rabbitmq.OutgoingRabbitMQMetadata;
import jakarta.inject.Singleton;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.reactive.messaging.Channel;
import org.eclipse.microprofile.reactive.messaging.Emitter;
import org.eclipse.microprofile.reactive.messaging.Message;
import org.eclipse.microprofile.reactive.messaging.Metadata;

import java.time.ZonedDateTime;

@Slf4j
@Singleton
public class ExamEventRabbitMQPublisher implements ExamEventPublisher {

    private final Emitter<ExamPublished> emitter;

    public ExamEventRabbitMQPublisher(@Channel("exams-out") Emitter<ExamPublished> emitter) {
        this.emitter = emitter;
    }

    @Override
    public void sendEvent(final ExamPublished event) {
        log.info("Sending exam publishing event {}", event);

        var metadata = OutgoingRabbitMQMetadata.builder()
                .withAppId("exams-service")
                .withRoutingKey("exam.published")
                .withTimestamp(ZonedDateTime.now())
                .build();

        emitter.send(Message.of(event, Metadata.of(metadata)));
    }
}
