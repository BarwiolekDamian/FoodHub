package backend.api.repositories.Users;

import backend.api.models.Users.UserInfo;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Integer>
{}