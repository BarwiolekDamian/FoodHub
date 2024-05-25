package backend.api.models.Products;

import jakarta.persistence.*;
import backend.api.models.Units.Unit;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`ProductNutritions`")
public class ProductNutritions
{
    @Id
    private Integer productId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Id")
    @MapsId
    private Product product;

    @Column(name = "Calories")
    private Double calories;

    @Column(name = "Fat")
    private Double fat;

    @Column(name = "Cholesterol")
    private Double cholesterol;

    @Column(name = "Sodium")
    private Double sodium;

    @Column(name = "Potassium")
    private Double potassium;

    @Column(name = "Sugars")
    private Double sugars;

    @Column(name = "Fiber")
    private Double fiber;

    @Column(name = "Protein")
    private Double protein;

    @Column(name = "Per", nullable = false)
    private Integer per;

    @ManyToOne
    @JoinColumn(name = "PerUnitId", nullable = false)
    private Unit unit;
}