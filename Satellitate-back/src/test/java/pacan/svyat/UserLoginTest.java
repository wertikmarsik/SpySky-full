package pacan.svyat;

import pacan.svyat.User.User;
import pacan.svyat.User.UserRepository;
import pacan.svyat.User.UserService;
import pacan.svyat.config.JwtGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserLoginTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtGenerator jwtGenerator;

    @InjectMocks
    private UserService userService;

    @Test
    public void testLoginUser() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");

        when(userRepository.findByEmail(anyString())).thenReturn(java.util.Optional.of(user));
        when(jwtGenerator.generateToken(anyString())).thenReturn("token");

        String token = userService.loginUser(user);

        assertEquals("token", token);
    }
}
