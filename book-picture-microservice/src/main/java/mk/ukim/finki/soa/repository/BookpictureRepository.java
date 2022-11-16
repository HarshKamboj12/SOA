package mk.ukim.finki.soa.repository;

import mk.ukim.finki.soa.domain.Bookpicture;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Bookpicture entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookpictureRepository extends JpaRepository<Bookpicture, Long> {

}
