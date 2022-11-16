package mk.ukim.finki.soa.service;

import mk.ukim.finki.soa.service.dto.BookpictureDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Bookpicture.
 */
public interface BookpictureService {

    /**
     * Save a bookpicture.
     *
     * @param bookpictureDTO the entity to save
     * @return the persisted entity
     */
    BookpictureDTO save(BookpictureDTO bookpictureDTO);

    /**
     * Get all the bookpictures.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BookpictureDTO> findAll(Pageable pageable);

    /**
     * Get the "id" bookpicture.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BookpictureDTO findOne(Long id);

    /**
     * Delete the "id" bookpicture.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
