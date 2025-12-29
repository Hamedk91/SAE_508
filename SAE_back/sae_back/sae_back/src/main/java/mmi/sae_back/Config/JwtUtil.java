package mmi.sae_back.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // ⚠️ Clé secrète : doit faire au moins 256 bits (32 caractères)
    private final String SECRET = "maCleSecrete12345678901234567890";
    private final long EXPIRATION = 1000 * 60 * 60 * 24; // 1 jour

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // Génération du token JWT
    public String generateToken(Long userId, String role) {
        return Jwts.builder()
                .claim("userId", userId)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Récupérer l'userId depuis le token
    public Long getUserId(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return ((Number) claims.get("userId")).longValue();
    }

    // Récupérer le rôle depuis le token
    public String getRole(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return (String) claims.get("role");
    }
}
