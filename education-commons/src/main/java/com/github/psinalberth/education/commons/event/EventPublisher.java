package com.github.psinalberth.education.commons.event;

public interface EventPublisher {

    void publish(final DomainEvent event);
}
