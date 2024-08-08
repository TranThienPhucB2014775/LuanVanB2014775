package com.post.controller;

import com.post.service.RentalPostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rental-post")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RentalPostController {
    RentalPostService rentalPostService;

    @PostMapping
    public void createRentalPost() {
        log.info("Creating rental post");
        rentalPostService.createRentalPost();
    }

    @PutMapping
    public void updateRentalPost() {
        log.info("Updating rental post");
        rentalPostService.updateRentalPost();
    }

    @DeleteMapping
    public void deleteRentalPost() {
        log.info("Deleting rental post");
        rentalPostService.deleteRentalPost();
    }

    @GetMapping
    public void getRentalPost() {
        log.info("Getting rental post");
        rentalPostService.getRentalPost();
    }

    @GetMapping("/all")
    public void getAllRentalPosts() {
        log.info("Getting all rental posts");
        rentalPostService.getAllRentalPosts();
    }
}
