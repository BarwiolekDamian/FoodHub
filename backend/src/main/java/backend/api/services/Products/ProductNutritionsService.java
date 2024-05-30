package backend.api.services.Products;

import backend.api.repositories.Products.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductNutritionsService
{
    private final ProductNutritionsRepository productNutritionsRepository;
}