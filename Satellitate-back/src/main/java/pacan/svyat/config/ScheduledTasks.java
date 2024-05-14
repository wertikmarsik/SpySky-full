package pacan.svyat.config;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pacan.svyat.User.User;
import pacan.svyat.User.UserRepository;

import java.util.Calendar;
import java.util.List;

@Component
public class ScheduledTasks {

    private final UserRepository userRepository;

    public ScheduledTasks(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void activateInactiveUsers() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, -30);

        List<User> inactiveUsers = userRepository.findByStatus(User.Status.inactive);
        for (User user : inactiveUsers) {
            user.setStatus(User.Status.active);
            user.setExpiration_date(null);
            userRepository.save(user);
        }
    }
}
