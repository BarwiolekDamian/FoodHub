package backend.api.models.Products;

import jakarta.persistence.*;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`Product`")
public class Product
{
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column(name = "Tag", nullable = false, unique = true)
    private String Tag;

    @Column(name = "Name", nullable = false, unique = true)
    private String Name;
}