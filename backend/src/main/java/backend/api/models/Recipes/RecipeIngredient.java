package backend.api.models.Recipes;

import jakarta.persistence.*;
import backend.api.models.Units.Unit;
import backend.api.models.Products.Product;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`RecipeIngredient`")
public class RecipeIngredient
{
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column(name = "Name")
    private String Name;

    @Column(name = "Custom", nullable = false)
    private Boolean Custom;

    @Column(name = "Quantity", nullable = false)
    private Double Quantity;

    @ManyToOne
    @JoinColumn(name = "RecipeId", nullable = false)
    private Recipe Recipe;

    @ManyToOne
    @JoinColumn(name = "ProductId")
    private Product Product;

    @ManyToOne
    @JoinColumn(name = "UnitId", nullable = false)
    private Unit Unit;
}