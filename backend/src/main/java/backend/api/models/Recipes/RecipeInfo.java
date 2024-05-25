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
    private Integer recipeId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Id")
    @MapsId
    private Recipe recipe;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "Description")
    private String description;

    @Column(name = "ImageUrl")
    private String imageUrl;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CreationDate", nullable = false)
    private Date creationDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ModificationDate", nullable = false)
    private Date modificationDate;
}