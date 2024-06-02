package backend.api.controllers.Users;

import backend.api.models.Users.*;
import backend.api.services.Users.*;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController
{
    private final UserService userService;

    @GetMapping("/get/current")
    public ResponseEntity<User> getUserByToken(@RequestParam("Token") String tokenStr)
    {
        return ResponseEntity.ok(userService.getUserByToken(tokenStr));
    }
}