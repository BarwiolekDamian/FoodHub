package backend.api.controllers.Users;

import backend.api.models.Users.*;
import backend.api.services.Users.*;

import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user-info")
public class UserInfoController
{
    private final UserInfoService userInfoService;

    @PutMapping("/update/{userId}/avatar")
    public ResponseEntity<UserInfo> uploadUserAvatar(@PathVariable("userId") Integer userId, @RequestParam("File") MultipartFile avatarFile) throws IOException
    {
        return ResponseEntity.ok(userInfoService.uploadUserAvatar(userId, avatarFile));
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<UserInfo> updateUser(@PathVariable("userId") Integer userId, @RequestBody UserInfo userInfo)
    {
        return ResponseEntity.ok(userInfoService.updateUser(userId, userInfo));
    }
}