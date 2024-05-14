package backend.api.repositories.Products;

import backend.api.models.Products.Product;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>
{}