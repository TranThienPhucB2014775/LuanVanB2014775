package com.post.service;

import com.post.repository.ApartmentRepositopry;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApartmentService {
    ApartmentRepositopry apartmentRepositopry;

    public void getApartment() {
        log.info("Get apartment");
    }

    public void createApartment() {
        log.info("Create apartment");
    }

    public void updateApartment() {
        log.info("Update apartment");
    }

    public void deleteApartment() {
        log.info("Delete apartment");
    }

    public void getAllApartments() {
        log.info("Get all apartments");
    }
}
