package com.github.psinalberth.education.commons.event;

import java.time.LocalDateTime;

public interface DomainEvent {

    LocalDateTime createdAt();
}
