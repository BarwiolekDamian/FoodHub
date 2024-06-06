package backend.api.services.Units;

import backend.api.models.Units.*;
import backend.api.repositories.Units.*;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UnitService
{
    private final UnitRepository unitRepository;

    public Unit getUnitById(Integer unitId)
    {
        Optional<Unit> repoResponse = unitRepository.findById(unitId);

        if(repoResponse.isPresent())
            return repoResponse.get();
        else
            throw new NoSuchElementException("INVALID UNIT: '" + unitId + "'");
    }

    public Unit getUnitBySymbol(String symbolStr)
    {
        Optional<Unit> repoResponse = unitRepository.findBySymbol(symbolStr);

        if(repoResponse.isPresent())
            return repoResponse.get();
        else
            throw new NoSuchElementException("INVALID UNIT: '" + symbolStr + "'");
    }

    public List<Unit> getAllUnits()
    {
        List<Unit> repoResponse = unitRepository.findAll();

        if(!repoResponse.isEmpty())
            return repoResponse;
        else
            throw new NoSuchElementException("EMPTY COLLECTION: 'Unit'");
    }

    public Unit addUnit(Unit unitObject)
    {
        Unit repoResponse = unitRepository.save(unitObject);
        return repoResponse;
    }

    public Unit updateUnit(Integer unitId, Unit newUnit)
    {
        @SuppressWarnings("unused")
        Unit oldUnit = getUnitById(unitId);

        newUnit.setId(unitId);

        Unit repoResponse = unitRepository.save(newUnit);
        return repoResponse;
    }

    public void removeUnitById(Integer unitId)
    {
        Unit unitObject = getUnitById(unitId);
        unitRepository.delete(unitObject);
    }
}