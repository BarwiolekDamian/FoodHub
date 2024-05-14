package backend.api.models.Products;

import jakarta.persistence.*;
import backend.api.models.Units.Unit;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`ProductNutritions`")
public class ProductNutritions
{
    @Id
    private Integer ProductId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Id")
    @MapsId
    private Product Product;

    @Column(name = "Calories")
    private Double Calories;

    @Column(name = "Fat")
    private Double Fat;

    @Column(name = "Cholesterol")
    private Double Cholesterol;

    @Column(name = "Sodium")
    private Double Sodium;

    @Column(name = "Potassium")
    private Double Potassium;

    @Column(name = "Sugars")
    private Double Sugars;

    @Column(name = "Fiber")
    private Double Fiber;

    @Column(name = "Protein")
    private Double Protein;

    @Column(name = "Per", nullable = false)
    private Integer Per;

    @ManyToOne
    @JoinColumn(name = "PerUnitId", nullable = false)
    private Unit Unit;
}