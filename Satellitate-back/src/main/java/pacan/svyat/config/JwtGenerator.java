package pacan.svyat.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.context.annotation.Configuration;
import pacan.svyat.User.User;

import java.util.Date;

@Configuration
public class JwtGenerator {
    private static final String SECRET_KEY = "e7d8d5bd774e4b7d27bd9b3ddc97fc0be3d4098c6574b3d9970708265e1b1700";

    public String generateToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 3600 * 1000);
        return Jwts.builder()
                .claim("email", user.getEmail())
                .claim("first_name", user.getFirst_name())
                .claim("last_name", user.getLast_name())
                .claim("country", user.getCountry())
                .claim("status", user.getStatus())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}
