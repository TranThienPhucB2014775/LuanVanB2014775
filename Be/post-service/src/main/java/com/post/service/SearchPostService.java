package com.post.service;

import com.post.entity.SearchPost;
import com.post.repository.SearchPostRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.constraints.UUID;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SearchPostService {

    SearchPostRepository searchPostRepository;

    public void createSearchPost() {

    }

    public void updateSearchPost() {

    }

    public void deleteSearchPost() {

    }

    public SearchPost getSearchPost() {
        return null;
    }

    public List<SearchPost> getAllSearchPosts() {
        return searchPostRepository.findAll();
    }
}
