package com.property.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.BiFunction;

import org.springframework.stereotype.Component;

@Component
public class ElapsedTimeCalculator {

    static Map<Long, BiFunction<Instant, Instant, String>> strategyMap = new LinkedHashMap<>();

    public ElapsedTimeCalculator() {
        strategyMap.put(60L, this::formatInSeconds); // 1 minute
        strategyMap.put(3600L, this::formatInMinutes); // 1 hour
        strategyMap.put(86400L, this::formatInHours); // 1 day
        strategyMap.put(604800L, this::formatInDays); // 1 week
        strategyMap.put(2592000L, this::formatInWeeks); // 1 month (approx)
        strategyMap.put(31536000L, this::formatInMonths); // 1 year (approx)
        strategyMap.put(Long.MAX_VALUE, this::formatInYears); // more than 1 year
    }

    public static String calculateElapsedTime(Instant start, Instant end) {
        long elapseSeconds = ChronoUnit.SECONDS.between(start, end);

        var strategy = strategyMap.entrySet().stream()
                .filter(longFunctionEntry -> elapseSeconds < longFunctionEntry.getKey())
                .findFirst()
                .get();
        return strategy.getValue().apply(start, end);
    }

    private String formatInSeconds(Instant start, Instant end) {
        long elapseSeconds = ChronoUnit.SECONDS.between(start, end);
        return String.format("%s seconds", elapseSeconds);
    }

    private String formatInMinutes(Instant start, Instant end) {
        long elapseMinutes = ChronoUnit.MINUTES.between(start, end);
        return String.format("%s minutes", elapseMinutes);
    }

    private String formatInHours(Instant start, Instant end) {
        long elapseHours = ChronoUnit.HOURS.between(start, end);
        return String.format("%s hours", elapseHours);
    }

    private String formatInDays(Instant start, Instant end) {
        long elapseDays = ChronoUnit.DAYS.between(start, end);
        return String.format("%s days", elapseDays);
    }

    private String formatInWeeks(Instant start, Instant end) {
        long elapseDays = ChronoUnit.DAYS.between(start, end);
        long elapseWeeks = elapseDays / 7;
        return String.format("%s weeks", elapseWeeks);
    }

    private String formatInMonths(Instant start, Instant end) {
        long elapseMonths = ChronoUnit.MONTHS.between(start, end);
        return String.format("%s months", elapseMonths);
    }

    private String formatInYears(Instant start, Instant end) {
        long elapseYears = ChronoUnit.YEARS.between(start, end);
        return String.format("%s years", elapseYears);
    }
}
