package pacan.svyat.Satellite;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;

public interface SatelliteRepository extends JpaRepository<Satellite, String> {

    @Query(value = "SELECT MAX(epoch) FROM Satellite")
    Timestamp findMaxDate();
    @Query(value = "SELECT MIN(epoch) FROM Satellite")
    Timestamp findMinDate();

    @Query(value = "SELECT TO_TIMESTAMP(AVG(EXTRACT(epoch FROM epoch))) AS avg_date FROM public.result_satellitedata", nativeQuery = true)
    Timestamp findAvgDate();
}
