package backend.api.models.Recipes;

import backend.api.models.Units.*;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

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
    private Integer id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Custom", nullable = false)
    private Boolean custom;

    @Column(name = "Quantity", nullable = false)
    private Double quantity;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "RecipeId", nullable = false)
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "UnitId", nullable = false)
    private Unit unit;
}