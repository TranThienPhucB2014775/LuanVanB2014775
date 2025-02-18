package com.property.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.property.entity.ReportIssue;

@Repository
public interface ReportIssueRepository
        extends JpaRepository<ReportIssue, String>, JpaSpecificationExecutor<ReportIssue> {}
