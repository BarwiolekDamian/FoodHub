package backend.api.services.Users;

import backend.api.repositories.Users.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserInfoService
{
    private final UserInfoRepository userInfoRepository;
}