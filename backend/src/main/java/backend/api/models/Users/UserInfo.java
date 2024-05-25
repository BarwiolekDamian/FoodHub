package backend.api.models.Users;

import java.util.Date;
import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`UserInfo`")
public class UserInfo
{
    @Id
    private Integer userId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Id")
    @MapsId
    private User user;

    @Column(name = "FirstName", nullable = false)
    private String firstName;

    @Column(name = "LastName", nullable = false)
    private String lastName;

    @Column(name = "PhoneNumber")
    private Integer phoneNumber;

    @Column(name = "ImageUrl")
    private String imageUrl;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "RegistrationDate", nullable = false)
    private Date registrationDate;
}