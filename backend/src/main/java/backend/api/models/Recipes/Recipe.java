package backend.api.models.Recipes;

import jakarta.persistence.*;
import backend.api.models.Users.User;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`Recipe`")
public class Recipe
{
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Active", nullable = false)
    private Boolean active = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "RecipeAccess", nullable = false)
    private RecipeAccess recipeAccess;

    @ManyToOne
    @JoinColumn(name = "AuthorId", nullable = false)
    private User user;
}