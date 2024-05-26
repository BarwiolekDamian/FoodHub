package backend.auth;

import java.io.IOException;
import lombok.AllArgsConstructor;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter
{
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final HandlerExceptionResolver handlerExceptionResolver;

    @Override
    @SuppressWarnings("null")
    protected void doFilterInternal(HttpServletRequest httpRequest, HttpServletResponse httpResponse, FilterChain filterChain) throws ServletException, IOException
    {
        final String authHeader = httpRequest.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer "))
        {
            filterChain.doFilter(httpRequest, httpResponse);
            return;
        }

        try
        {
            final String jwtStr = authHeader.substring(7);
            final String usernameStr = jwtService.extractUsername(jwtStr);
            Authentication authenticationObj = SecurityContextHolder.getContext().getAuthentication();

            if (usernameStr != null && authenticationObj == null)
            {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(usernameStr);

                if (jwtService.isTokenValid(jwtStr, userDetails))
                {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken
                    (
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                    );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

            filterChain.doFilter(httpRequest, httpResponse);
        } catch (Exception exception)
        {
            handlerExceptionResolver.resolveException(httpRequest, httpResponse, null, exception);
        }
    }
}