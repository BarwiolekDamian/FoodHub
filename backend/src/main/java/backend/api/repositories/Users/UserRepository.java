package backend.api.repositories.Users;

import backend.api.models.Users.User;

import java.util.Optional;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>
{
    Optional<User> findByLogin(String userLogin);
}