package backend.api.services.Users;

import backend.auth.JwtService;
import backend.api.models.Users.*;
import backend.api.repositories.Users.*;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService
{
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public User getUserByLogin(String userLogin)
    {
        Optional<User> repoResponse = userRepository.findByLogin(userLogin);

        if(repoResponse.isPresent())
            return repoResponse.get();
        else
            throw new NoSuchElementException("INVALID USER: '" + userLogin + "'");
    }

    public User getUserById(Integer userId)
    {
        Optional<User> repoResponse = userRepository.findById(userId);

        if(repoResponse.isPresent())
            return repoResponse.get();
        else
            throw new NoSuchElementException("INVALID USER: '" + userId + "'");
    }

    public User getUserByToken(String tokenStr)
    {
        String userLogin = jwtService.extractUsername(tokenStr);
        Optional<User> repoResponse = userRepository.findByLogin(userLogin);

        if(repoResponse.isPresent())
            return repoResponse.get();
        else
            throw new NoSuchElementException("INVALID USER: '" + userLogin + "'");
    }
}