package pacan.svyat.Satellite;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pacan.svyat.User.User;

import java.util.List;

@RestController
@RequestMapping("/satellites")
public class SatelliteController {

    private final SatelliteService satelliteService;

    public SatelliteController(SatelliteService satelliteService) {
        this.satelliteService = satelliteService;
    }

    @GetMapping("/")
    private List<Satellite> getAllSatellite() {
        return satelliteService.getAllSatellite();
    }

    @GetMapping("/maxmin/{status}")
    private MaxMinResponse getMaxMin(@PathVariable User.Sub status) {
        return satelliteService.getMaxMin(status);
    }
}
