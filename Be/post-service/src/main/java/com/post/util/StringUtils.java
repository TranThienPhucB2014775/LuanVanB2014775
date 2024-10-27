package com.post.util;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class StringUtils {
    private static final Pattern NON_ASCII = Pattern.compile("[^\\p{ASCII}]");

    public static String removeDiacritics(String input) {
        if(input == null) {
            return null;
        }
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        return NON_ASCII.matcher(normalized).replaceAll("");
    }
}
