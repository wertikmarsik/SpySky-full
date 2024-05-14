package pacan.svyat.Satellite;

import lombok.*;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MaxMinResponse {
    private Timestamp minValue;
    private Timestamp maxValue;
}
