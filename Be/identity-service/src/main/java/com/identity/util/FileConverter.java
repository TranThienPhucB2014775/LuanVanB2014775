package com.identity.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileConverter {

    private static final Logger log = LoggerFactory.getLogger(FileConverter.class);

    public MultipartFile convertToMultipartFile(byte[] bytes, String fileName, String contentType) {
        return new CustomMultipartFile(bytes, fileName, contentType);
    }
}
