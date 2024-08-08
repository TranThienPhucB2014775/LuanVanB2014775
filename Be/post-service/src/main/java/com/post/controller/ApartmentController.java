package com.post.controller;

import com.post.service.ApartmentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/apartment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApartmentController {

    ApartmentService apartmentService;

    @PostMapping
    public void createApartment() {
        log.info("Creating apartment");
        apartmentService.createApartment();
    }

    @PutMapping
    public void updateApartment() {
        log.info("Updating apartment");
        apartmentService.updateApartment();
    }

    @DeleteMapping
    public void deleteApartment() {
        log.info("Deleting apartment");
        apartmentService.deleteApartment();
    }

    @GetMapping
    public void getApartment() {
        log.info("Getting apartment");
        apartmentService.getApartment();
    }

    @GetMapping("/all")
    public void getAllApartments() {
        log.info("Getting all apartments");
        apartmentService.getAllApartments();
    }
}
