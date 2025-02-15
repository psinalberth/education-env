package com.github.psinalberth.education.question.adapter.persistence

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface QuestionDatabaseRepository : JpaRepository<QuestionEntity, Long> {

    fun findByExternalId(externalId: String): QuestionEntity?

    @Query("select q from QuestionEntity q left join fetch q.options")
    override fun findAll(): List<QuestionEntity>
}