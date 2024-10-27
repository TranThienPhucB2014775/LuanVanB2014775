package com.profile.audit;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component("auditAwareImpl")
public class AuditAwareImpl implements AuditorAware<String> {

    private static final Logger log = LoggerFactory.getLogger(AuditAwareImpl.class);

    @Override
    public Optional<String> getCurrentAuditor() {
        log.info("Fetching the current auditor");
        log.info("Current auditor is: "
                + SecurityContextHolder.getContext().getAuthentication().getName());
        return Optional.ofNullable(
                SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
