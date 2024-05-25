package backend.api.models.Products;

import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

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
    private Integer id;

    @Column(name = "Tag", nullable = false, unique = true)
    private String tag;

    @Column(name = "Name", nullable = false, unique = true)
    private String name;
}