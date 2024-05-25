package backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;

@Configuration
public class JacksonConfig
{
    @Bean
    public ObjectMapper objectMapper()
    {
        // Configure JSON To Return Uppercase Indexes
        ObjectMapper objMapper = new ObjectMapper();
        objMapper.setPropertyNamingStrategy(PropertyNamingStrategies.UPPER_CAMEL_CASE);

        return objMapper;
    }
}