package pacan.svyat.User.Respones;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PasswordResponse {
    private String email;
    private String oldPassword;
    private String newPassword;
}
