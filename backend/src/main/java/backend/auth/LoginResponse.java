package backend.auth;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class LoginResponse
{
    private String token;

    private Long expiresIn;
}