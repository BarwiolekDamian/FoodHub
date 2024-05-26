package backend.auth;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest
{
    private String login;

    private String email;

    private String password;

    private String firstName;

    private String lastName;
}