package com.example.urlshortener.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.urlshortener.model.UrlMapping;

public interface UrlRepository extends JpaRepository<UrlMapping, Long> {

    UrlMapping findByShortCode(String shortCode);

}