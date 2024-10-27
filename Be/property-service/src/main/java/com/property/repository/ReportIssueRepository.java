package com.property.repository;

import com.property.entity.ReportIssue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportIssueRepository extends JpaRepository<ReportIssue, String>, JpaSpecificationExecutor<ReportIssue> {
}
