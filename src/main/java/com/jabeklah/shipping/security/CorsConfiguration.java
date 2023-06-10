package com.jabeklah.shipping.security;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Match all paths
                .allowedOrigins("https://whimsical-peony-04b1a2.netlify.app/") // Add your client URLs here
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Add the HTTP methods allowed by your API
                .allowedHeaders("*"); // Add the allowed request headers
    }
}
