package pacan.svyat.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByConfirmationCode(String confirmationCode);
    Optional<User> findByEmail(String email);
    List<User> findByStatus(User.Status status);
}
