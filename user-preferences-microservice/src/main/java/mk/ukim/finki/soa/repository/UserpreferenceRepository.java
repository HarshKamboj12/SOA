package mk.ukim.finki.soa.repository;

import mk.ukim.finki.soa.domain.Userpreference;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Userpreference entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserpreferenceRepository extends JpaRepository<Userpreference, Long> {

}
