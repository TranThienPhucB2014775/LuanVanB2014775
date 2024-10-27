package com.property.service;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class DateTimeFormatterFuture {

    Map<Long, Function<Instant, String>> strategyMap = new LinkedHashMap<>();

    public DateTimeFormatterFuture() {
        strategyMap.put(60L, this::formatInSeconds);
        strategyMap.put(3600L, this::formatInMinutes);
        strategyMap.put(86400L, this::formatInHours);
        strategyMap.put(Long.MAX_VALUE, this::formatInDate);
    }

    public String format(Instant instant) {
        long elapseSeconds = ChronoUnit.SECONDS.between(Instant.now(), instant);

        if (elapseSeconds < 0) {
            throw new IllegalArgumentException("The provided instant is not in the future.");
        }

        var strategy = strategyMap.entrySet()
                .stream()
                .filter(longFunctionEntry -> elapseSeconds < longFunctionEntry.getKey())
                .findFirst().get();
        return strategy.getValue().apply(instant);
    }

    private String formatInSeconds(Instant instant) {
        long elapseSeconds = ChronoUnit.SECONDS.between(Instant.now(), instant);
        return String.format("in %s seconds", elapseSeconds);
    }

    private String formatInMinutes(Instant instant) {
        long elapseMinutes = ChronoUnit.MINUTES.between(Instant.now(), instant);
        return String.format("in %s minutes", elapseMinutes);
    }

    private String formatInHours(Instant instant) {
        long elapseHours = ChronoUnit.HOURS.between(Instant.now(), instant);
        return String.format("in %s hours", elapseHours);
    }

    private String formatInDate(Instant instant) {
        LocalDateTime localDateTime = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
        java.time.format.DateTimeFormatter dateTimeFormatter = java.time.format.DateTimeFormatter.ISO_DATE;
        return String.format("%s", localDateTime.format(dateTimeFormatter));
    }
}