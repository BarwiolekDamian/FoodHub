package backend.api.models.Recipes;

import lombok.Data;
import java.util.Date;
import jakarta.persistence.*;
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
    @Column(name = "RecipeId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recipeId;

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