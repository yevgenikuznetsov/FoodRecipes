package foodReciepe.repositories;

import foodReciepe.dbData.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritesDao extends JpaRepository<Favorite, Long> {
}
