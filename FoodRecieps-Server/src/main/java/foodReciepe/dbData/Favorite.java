package foodReciepe.dbData;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "favorites")
public class Favorite {
    @Id
    private Long id;
}
