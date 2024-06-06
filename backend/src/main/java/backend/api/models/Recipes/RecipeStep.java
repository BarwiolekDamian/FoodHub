package backend.api.models.Recipes;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`RecipeStep`")
public class RecipeStep
{
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "SequenceNumber", nullable = false)
    private Integer sequenceNumber;

    @Column(name = "Content", nullable = false)
    private String content;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "RecipeId", nullable = false)
    private Recipe recipe;
}