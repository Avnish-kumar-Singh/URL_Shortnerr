// package com.example.urlshortener.controller;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.servlet.view.RedirectView;

// import com.example.urlshortener.service.UrlService;

// @RestController
// public class UrlController {

//     private final UrlService service;

//     public UrlController(UrlService service) {
//         this.service = service;
//     }

//     // API to shorten URL
//     @PostMapping("/shorten")
//     public ResponseEntity<String> shortenUrl(@RequestBody String url) {

//         String shortCode = service.shortenUrl(url);

//         return ResponseEntity.ok("http://localhost:8080/" + shortCode);
//     }

//     // Redirect to original URL
//     @GetMapping("/{shortCode}")
//     public RedirectView redirect(@PathVariable String shortCode) {

//         String originalUrl = service.getOriginalUrl(shortCode);

//         return new RedirectView(originalUrl);
//     }
// }



package com.example.urlshortener.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.example.urlshortener.model.UrlRequest; // ✅ new import
import com.example.urlshortener.service.UrlService;

@RestController
public class UrlController {

    private final UrlService service;

    public UrlController(UrlService service) {
        this.service = service;
    }

    // API to shorten URL
    @PostMapping("/shorten")
    public ResponseEntity<String> shortenUrl(@RequestBody UrlRequest request) { // ✅ fixed
        String shortCode = service.shortenUrl(request.getUrl()); // ✅ fixed
        return ResponseEntity.ok("http://localhost:8080/" + shortCode);
    }

    // Redirect to original URL
    @GetMapping("/{shortCode}")
    public RedirectView redirect(@PathVariable String shortCode) {
        String originalUrl = service.getOriginalUrl(shortCode);
        return new RedirectView(originalUrl);
    }
}