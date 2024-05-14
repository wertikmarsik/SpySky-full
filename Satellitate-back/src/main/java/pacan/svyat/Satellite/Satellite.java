package pacan.svyat.Satellite;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.naming.Name;
import java.sql.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Table(name = "result_satellitedata")
public class Satellite {
    @Id
    @Column(name = "object_id")
    private String object_id;

    @Column(name = "object_name")
    private String object_name;

    @Column(name = "epoch")
    private Timestamp epoch;

    @Column(name = "x")
    private Double x;

    @Column(name = "y")
    private Double y;

    @Column(name = "z")
    private Double z;
}
