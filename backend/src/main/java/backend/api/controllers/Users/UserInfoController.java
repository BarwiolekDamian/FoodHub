package backend.api.controllers.Users;

import backend.api.services.Users.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-info")
public class UserInfoController
{
    private final UserInfoService userInfoService;
}