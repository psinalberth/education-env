package com.github.psinalberth.education.exam.adapter.message;

import com.github.psinalberth.education.exam.domain.model.exam.ExamPublished;
import io.smallrye.reactive.messaging.annotations.Blocking;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Message;

import java.util.concurrent.CompletionStage;

@Slf4j
@ApplicationScoped
public class ExamEventRabbitMQConsumer {

    @Blocking
    @Incoming("exams-in")
    public CompletionStage<Void> onMessage(Message<ExamPublished> message) {
        log.info("Listening to message {}", message.getPayload());
        return message.ack();
    }
}
