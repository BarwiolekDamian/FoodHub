package backend.api.models.Users;

import jakarta.persistence.*;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`User`")
public class User
{
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column(name = "Login", nullable = false, unique = true)
    private String Login;

    @Column(name = "Email", nullable = false, unique = true)
    private String Email;

    @Column(name = "Password", nullable = false)
    private String Password;

    @Column(name = "Active", nullable = false)
    private Boolean Active;

    @Enumerated(EnumType.STRING)
    @Column(name = "UserRole", nullable = false)
    private UserRole UserRole;
}