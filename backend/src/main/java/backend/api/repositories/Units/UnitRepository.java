package backend.api.repositories.Units;

import backend.api.models.Units.Unit;

import java.util.Optional;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Integer>
{
    Optional<Unit> findBySymbol(String symbolStr);
}