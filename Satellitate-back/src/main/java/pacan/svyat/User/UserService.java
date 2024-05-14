package pacan.svyat.User;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pacan.svyat.User.Respones.PasswordResponse;
import pacan.svyat.config.EmailService;
import pacan.svyat.config.JwtGenerator;

import java.sql.Date;
import java.util.UUID;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final JwtGenerator jwtGenerator;

    private static String randomString() {
        return UUID.randomUUID().toString();
    }

    public Boolean verifyPassword(String password, String encodedPassword) {
        return passwordEncoder.matches(password, encodedPassword);
    }


    public UserService(PasswordEncoder passwordEncoder, EmailService emailService, UserRepository userRepository, JwtGenerator jwtGenerator) {
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.userRepository = userRepository;
        this.jwtGenerator = jwtGenerator;
    }

    public String registerUser(User request) {
        var user = User.builder()
                .first_name(request.getFirst_name())
                .last_name(request.getLast_name())
                .email(request.getEmail())
                .country(request.getCountry())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone_number(request.getPhone_number())
                .role(User.Role.user)
                .status(User.Status.active)
                .sub(User.Sub.standart)
                .confirmationCode(randomString())
                .is_confirmed(false)
                .build();
        userRepository.save(user);
        emailService.sendCode(user.getEmail(), user.getConfirmationCode());
        return jwtGenerator.generateToken(user);
    }

    public User confirmUser(String code) {
        User user = userRepository.findByConfirmationCode(code).orElseThrow();
        user.setConfirmationCode(null);
        user.setIs_confirmed(true);
        userRepository.save(user);
        return user;
    }

    public String loginUser(User request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        if (!user.getIs_confirmed() || !verifyPassword(request.getPassword(), user.getPassword())) {
            return null;
        }
        if (user.getStatus() == User.Status.inactive) {
            return null;
        }

        return jwtGenerator.generateToken(user);
    }

    public String updateUserPersonalInfo(User request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        user.setEmail(request.getEmail());
        user.setFirst_name(request.getFirst_name());
        user.setLast_name(request.getLast_name());
        user.setCountry(request.getCountry());
        userRepository.save(user);
        return jwtGenerator.generateToken(user);
    }

    public String updateUserPassword(PasswordResponse request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            return null;
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return "You need to login";
    }

    public String deleteUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        userRepository.deleteById(user.getId());
        return "Deleted";
    }

    public String deactivateUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        user.setStatus(User.Status.inactive);
        user.setExpiration_date(new Date(System.currentTimeMillis()));
        userRepository.save(user);
        return "Deactivated";
    }
}
