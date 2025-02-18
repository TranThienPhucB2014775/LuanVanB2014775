package com.notification.audit;

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
        try {
            log.info(
                    "Current auditor: {}",
                    SecurityContextHolder.getContext().getAuthentication().getName());
            return Optional.ofNullable(
                    SecurityContextHolder.getContext().getAuthentication().getName());
        } catch (Exception e) {
            return Optional.of("ADMIN");
        }
    }
}
