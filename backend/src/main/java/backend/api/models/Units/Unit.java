package backend.api.models.Units;

import jakarta.persistence.*;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

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
    private Integer Id;

    @Column(name = "Tag", nullable = false, unique = true)
    private String Tag;

    @Column(name = "Symbol", nullable = false, unique = true)
    private String Symbol;

    @Column(name = "Name", nullable = false, unique = true)
    private String Name;
}