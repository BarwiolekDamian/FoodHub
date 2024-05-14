package backend.api.repositories.Products;

import backend.api.models.Products.ProductNutritions;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ProductNutritionsRepository extends JpaRepository<ProductNutritions, Integer>
{}