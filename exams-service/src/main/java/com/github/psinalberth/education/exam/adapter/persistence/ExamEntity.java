package com.github.psinalberth.education.exam.adapter.persistence;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "exams", schema = "education")
public class ExamEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private LocalDateTime date;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "exam")
    private List<QuestionEntity> questions;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "external_id")
    private String externalId;

    private boolean published;

    public void addQuestion(QuestionEntity question) {
        if (questions == null) {
            this.questions = new ArrayList<>();
        }

        question.setExam(this);
        this.questions.add(question);
    }
}
