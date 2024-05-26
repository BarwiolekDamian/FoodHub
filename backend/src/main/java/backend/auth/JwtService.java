package backend.auth;

import java.security.Key;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Map;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;

@Service
public class JwtService
{
    @Value("${security.secret-key}")
    private String secretKey;

    @Value("${security.expiration-time}")
    private Long jwtExpiration;

    public String extractUsername(String tokenStr)
    {
        return extractClaim(tokenStr, Claims::getSubject);
    }

    public <T> T extractClaim(String tokenStr, Function<Claims, T> claimsResolver)
    {
        final Claims jwtClaims = extractAllClaims(tokenStr);
        return claimsResolver.apply(jwtClaims);
    }

    public String generateToken(UserDetails userDetails)
    {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails)
    {
        return buildToken(extraClaims, userDetails, this.jwtExpiration);
    }

    public Long getExpirationTime()
    {
        return this.jwtExpiration;
    }

    private String buildToken
    (
        Map<String, Object> extraClaims,
        UserDetails userDetails,
        Long expirationValue
    )
    {
        return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .setExpiration(new Date(System.currentTimeMillis() + expirationValue))
            .compact();
    }

    public Boolean isTokenValid(String tokenStr, UserDetails userDetails)
    {
        final String extractedUsername = extractUsername(tokenStr);
        return (extractedUsername.equals(userDetails.getUsername())) && !isTokenExpired(tokenStr);
    }

    private Boolean isTokenExpired(String tokenStr)
    {
        return extractExpiration(tokenStr).before(new Date());
    }

    private Date extractExpiration(String tokenStr)
    {
        return extractClaim(tokenStr, Claims::getExpiration);
    }

    private Claims extractAllClaims(String tokenStr)
    {
        return Jwts
            .parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(tokenStr)
            .getBody();
    }

    private Key getSignInKey()
    {
        byte[] keyBytes = Decoders.BASE64.decode(this.secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}