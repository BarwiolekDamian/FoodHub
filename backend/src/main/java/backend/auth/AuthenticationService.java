package backend.auth;

import backend.api.models.Users.*;
import backend.api.services.Users.*;
import backend.api.repositories.Users.*;

import java.util.Date;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Service
@AllArgsConstructor
public class AuthenticationService
{
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public User registerUser(RegisterRequest requestInput)
    {
        UserInfo userInfo = new UserInfo
        (
            null,
            requestInput.getFirstName(),
            requestInput.getLastName(),
            null,
            null,
            new Date()
        );

        User newUser = new User
        (
            null,
            requestInput.getLogin(),
            requestInput.getEmail(),
            passwordEncoder.encode(requestInput.getPassword()),
            true,
            UserRole.USER,
            userInfo
        );

        return userRepository.save(newUser);
    }

    public User loginUser(LoginRequest requestInput)
    {
        authenticationManager.authenticate
        (
            new UsernamePasswordAuthenticationToken
            (
                requestInput.getLogin(),
                requestInput.getPassword()
            )
        );

        return userService.getUserByLogin(requestInput.getLogin());
    }
}