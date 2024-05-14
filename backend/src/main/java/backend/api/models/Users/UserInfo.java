package backend.api.models.Users;

import java.util.Date;
import jakarta.persistence.*;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`UserInfo`")
public class UserInfo
{
    @Id
    private Integer UserId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Id")
    @MapsId
    private User User;

    @Column(name = "FirstName", nullable = false)
    private String FirstName;

    @Column(name = "LastName", nullable = false)
    private String LastName;

    @Column(name = "PhoneNumber")
    private Integer PhoneNumber;

    @Column(name = "ImageUrl")
    private String ImageUrl;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "RegistrationDate", nullable = false)
    private Date RegistrationDate;
}