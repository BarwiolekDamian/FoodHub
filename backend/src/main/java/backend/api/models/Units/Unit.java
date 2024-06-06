package backend.api.models.Units;

import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`Unit`")
public class Unit
{
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Symbol", nullable = false, unique = true)
    private String symbol;

    @Column(name = "Name", nullable = false, unique = true)
    private String name;

    public Unit(String unitSymbol)
    {
        this.id = null;
        this.name = null;
        this.symbol = unitSymbol;
    }
}