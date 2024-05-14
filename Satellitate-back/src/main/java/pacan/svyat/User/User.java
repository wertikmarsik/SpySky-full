package pacan.svyat.User;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Calendar;


@Getter
@Setter
@Entity
@Table(name = "users")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @Column(nullable = false, unique = true, name = "email")
    private String email;

    @Column(nullable = false, name = "password")
    @Min(6)
    private String password;

    @Column(nullable = false, name = "first_name")
    private String first_name;

    @Column(nullable = false, name = "last_name")
    private String last_name;

    @Column(nullable = false, name = "phone_number")
    private String phone_number;

    @Column(nullable = false, name = "country")
    private String country;

    @Column(unique = true, name = "confirmationCode")
    private String confirmationCode;

    @Column(name = "is_confirmed")
    private Boolean is_confirmed;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(name = "subscription")
    private Sub sub;

    @Column(name = "card_number")
    @Max(16)
    @Min(16)
    private String card_number;

    @Column(name = "expiration_date")
    private Date expiration_date;

    @Column(name = "cvv")
    private String cvv;


    public enum Sub {
        standart,
        premium
    }
    public enum Role {
        admin,
        moderator,
        user
    }

    public enum Status {
        active,
        inactive
    }
}
