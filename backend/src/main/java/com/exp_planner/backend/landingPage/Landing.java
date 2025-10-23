package com.exp_planner.backend.landingPage;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Landing {

    @GetMapping("/landing")
    public String landing() {
        return "Hello from Spring Boot Backend! \nThis is the landing page of the backend.";
    }
}