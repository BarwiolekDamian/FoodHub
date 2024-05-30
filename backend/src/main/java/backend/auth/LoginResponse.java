package backend.auth;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class LoginResponse
{
    private String authToken;

    private Long expiresIn;
}