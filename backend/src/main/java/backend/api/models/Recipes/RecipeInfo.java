package backend.api.models.Recipes;

import java.util.Date;
import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`RecipeInfo`")
public class RecipeInfo
{
    @Id
    private Integer RecipeId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Id")
    @MapsId
    private Recipe Recipe;

    @Column(name = "Title", nullable = false)
    private String Title;

    @Column(name = "Description")
    private String Description;

    @Column(name = "ImageUrl")
    private String ImageUrl;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CreationDate", nullable = false)
    private Date CreationDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ModificationDate", nullable = false)
    private Date ModificationDate;
}