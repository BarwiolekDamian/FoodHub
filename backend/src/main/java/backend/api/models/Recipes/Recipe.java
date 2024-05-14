package backend.api.models.Recipes;

import jakarta.persistence.*;
import backend.api.models.Users.User;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

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
    private Integer Id;

    @Column(name = "Active", nullable = false)
    private Boolean Active = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "RecipeAccess", nullable = false)
    private RecipeAccess RecipeAccess;

    @ManyToOne
    @JoinColumn(name = "AuthorId", nullable = false)
    private User User;
}