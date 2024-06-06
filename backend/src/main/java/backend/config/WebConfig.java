package backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer
{
    @Override
    public void addCorsMappings(@SuppressWarnings("null") CorsRegistry corsRegistry)
    {
        corsRegistry.addMapping("/api/**")
            .allowedHeaders("*")
            .exposedHeaders("Authorization")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE");
        
        corsRegistry.addMapping("/auth/**")
            .allowedHeaders("*")
            .exposedHeaders("Authorization")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}