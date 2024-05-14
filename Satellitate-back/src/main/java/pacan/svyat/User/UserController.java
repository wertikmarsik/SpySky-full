package pacan.svyat.User;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pacan.svyat.User.Respones.PasswordResponse;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User request) {
        return ResponseEntity.ok(userService.registerUser(request));
    }

    @PostMapping("/confirm")
    public ResponseEntity<User> confirmUser(@RequestBody User request) {
        return ResponseEntity.ok(userService.confirmUser(request.getConfirmationCode()));
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User request) {
        return ResponseEntity.ok(userService.loginUser(request));
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateUserPersonalInfo(@RequestBody User request) {
        return ResponseEntity.ok(userService.updateUserPersonalInfo(request));
    }

    @PutMapping("/password")
    public ResponseEntity<String> updateUserPassword(@RequestBody PasswordResponse request) {
        return ResponseEntity.ok(userService.updateUserPassword(request));
    }

    @PostMapping("/deactivate")
    public ResponseEntity<String> deactivateUser(@RequestBody User user) {
            return ResponseEntity.ok(userService.deactivateUser(user.getEmail()));
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<String> deleteUser(@PathVariable String email) {
        return ResponseEntity.ok(userService.deleteUser(email));
    }
}
