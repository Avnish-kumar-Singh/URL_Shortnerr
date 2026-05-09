package com.example.urlshortener.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.urlshortener.model.UrlMapping;
import com.example.urlshortener.repository.UrlRepository;

@Service
public class UrlService {

    private final UrlRepository repository;

    public UrlService(UrlRepository repository) {
        this.repository = repository;
    }

    // Generate short URL
    public String shortenUrl(String originalUrl) {

        String shortCode = UUID.randomUUID().toString().substring(0,6);

        UrlMapping url = new UrlMapping(originalUrl, shortCode);

        repository.save(url);

        return shortCode;
    }

    // Get original URL from short code
    public String getOriginalUrl(String shortCode) {

        UrlMapping url = repository.findByShortCode(shortCode);

        if (url != null) {

            url.setClickCount(url.getClickCount() + 1);
            repository.save(url);

            return url.getOriginalUrl();
        }

        return null;
    }
}