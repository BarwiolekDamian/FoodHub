package backend.api.controllers.Units;

import backend.api.models.Units.*;
import backend.api.services.Units.*;

import java.util.List;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/unit")
public class UnitController
{
    private final UnitService unitService;

    @GetMapping("/get/{unitId}")
    public ResponseEntity<Unit> getUnitById(@PathVariable Integer unitId)
    {
        return ResponseEntity.ok(unitService.getUnitById(unitId));
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<Unit>> getAllUnits()
    {
        return ResponseEntity.ok(unitService.getAllUnits());
    }

    @PutMapping("/update/{unitId}")
    public ResponseEntity<Unit> updateUnit(@PathVariable Integer unitId, @RequestBody Unit unitObject)
    {
        return ResponseEntity.ok(unitService.updateUnit(unitId, unitObject));
    }

    @PostMapping("/add")
    public ResponseEntity<Unit> addUnit(@RequestBody Unit unitObject)
    {
        return ResponseEntity.ok(unitService.addUnit(unitObject));
    }

    @DeleteMapping("/remove/{unitId}")
    public ResponseEntity<HttpStatus> removeUnitById(@PathVariable Integer unitId)
    {
        unitService.removeUnitById(unitId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}