package com.post.controller;

import com.post.service.SearchPostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/SearchPost")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SearchPostController {

    SearchPostService searchPostService;

    @PostMapping
    public void createSearchPost() {
        log.info("Creating search post");
        searchPostService.createSearchPost();
    }

    @PutMapping
    public void updateSearchPost() {
        log.info("Updating search post");
        searchPostService.updateSearchPost();
    }

    @DeleteMapping
    public void deleteSearchPost() {
        log.info("Deleting search post");
        searchPostService.deleteSearchPost();
    }

    @GetMapping
    public void getSearchPost() {
        log.info("Getting search post");
        searchPostService.getSearchPost();
    }
}
