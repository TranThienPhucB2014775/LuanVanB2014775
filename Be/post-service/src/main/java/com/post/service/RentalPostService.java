package com.post.service;

import com.post.repository.RentalPostRepositopry;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RentalPostService {
    RentalPostRepositopry rentalPostRepositopry;

    public void createRentalPost() {
        log.info("Create Rental Post");
    }

    public void updateRentalPost() {
        log.info("Update Rental Post");
    }

    public void deleteRentalPost() {
        log.info("Delete Rental Post");
    }

    public void getRentalPost() {
        log.info("Get Rental Post");
    }

    public void getAllRentalPosts() {
        log.info("Get Rental Posts");
    }
}
