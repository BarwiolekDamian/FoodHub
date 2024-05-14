package backend.api.repositories.Units;

import backend.api.models.Units.Unit;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Integer>
{}