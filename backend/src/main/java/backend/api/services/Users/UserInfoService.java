package backend.api.services.Users;

import backend.api.models.Users.*;
import backend.api.repositories.Users.*;

import java.util.Optional;
import java.util.NoSuchElementException;

import java.nio.file.Path;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserInfoService
{
    private final UserInfoRepository userInfoRepository;

    public UserInfo getUserInfoById(Integer userId)
    {
        Optional<UserInfo> repoResponse = userInfoRepository.findById(userId);

        if(repoResponse.isPresent())
            return repoResponse.get();
        else
            throw new NoSuchElementException("INVALID USER INFO: '" + userId + "'");
    }

    public UserInfo uploadUserAvatar(Integer userId, MultipartFile avatarFile) throws IOException
    {
        UserInfo userInfo = getUserInfoById(userId);
        String fileName = String.valueOf(userId) + ".png";

        Path targetDir = Paths.get("backend/src/main/resources/static/user-avatars");
        Files.copy(avatarFile.getInputStream(), targetDir.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

        userInfo.setImageUrl("user-avatars/" + fileName);
        return userInfoRepository.save(userInfo);
    }

    public UserInfo updateUser(Integer userId, UserInfo newUserInfo)
    {
        UserInfo userInfo = getUserInfoById(userId);

        userInfo.setPhoneNumber(newUserInfo.getPhoneNumber());
        userInfo.setFirstName(newUserInfo.getFirstName());
        userInfo.setLastName(newUserInfo.getLastName());

        return userInfoRepository.save(userInfo);
    }
}