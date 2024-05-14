package backend.api.models.Recipes;

import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`RecipeStep`")
public class RecipeStep
{
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column(name = "SequenceNumber", nullable = false)
    private Integer SequenceNumber;

    @Column(name = "Content", nullable = false)
    private String Content;

    @Column(name = "ImageUrl")
    private String ImageUrl;

    @ManyToOne
    @JoinColumn(name = "RecipeId", nullable = false)
    private Recipe Recipe;
}