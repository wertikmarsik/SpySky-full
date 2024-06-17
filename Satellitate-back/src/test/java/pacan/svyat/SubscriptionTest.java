package pacan.svyat;

import pacan.svyat.dto.SubscriptionDto;
import pacan.svyat.User.UserRepository;
import pacan.svyat.User.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SubscriptionTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void testSubscription() {
        SubscriptionDto subscription = new SubscriptionDto();
        subscription.setUserId(1L);
        subscription.setSubscriptionType("premium");

        // додайте відповідні перевірки та логіку тестування
    }
}
