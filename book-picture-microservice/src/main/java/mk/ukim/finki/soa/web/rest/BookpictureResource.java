package mk.ukim.finki.soa.web.rest;

import com.codahale.metrics.annotation.Timed;
import mk.ukim.finki.soa.service.BookpictureService;
import mk.ukim.finki.soa.web.rest.errors.BadRequestAlertException;
import mk.ukim.finki.soa.web.rest.util.HeaderUtil;
import mk.ukim.finki.soa.web.rest.util.PaginationUtil;
import mk.ukim.finki.soa.service.dto.BookpictureDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Bookpicture.
 */
@RestController
@RequestMapping("/api")
public class BookpictureResource {

    private final Logger log = LoggerFactory.getLogger(BookpictureResource.class);

    private static final String ENTITY_NAME = "bookpicture";

    private final BookpictureService bookpictureService;

    public BookpictureResource(BookpictureService bookpictureService) {
        this.bookpictureService = bookpictureService;
    }

    /**
     * POST  /bookpictures : Create a new bookpicture.
     *
     * @param bookpictureDTO the bookpictureDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bookpictureDTO, or with status 400 (Bad Request) if the bookpicture has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bookpictures")
    @Timed
    public ResponseEntity<BookpictureDTO> createBookpicture(@RequestBody BookpictureDTO bookpictureDTO) throws URISyntaxException {
        log.debug("REST request to save Bookpicture : {}", bookpictureDTO);
        if (bookpictureDTO.getId() != null) {
            throw new BadRequestAlertException("A new bookpicture cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BookpictureDTO result = bookpictureService.save(bookpictureDTO);
        return ResponseEntity.created(new URI("/api/bookpictures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bookpictures : Updates an existing bookpicture.
     *
     * @param bookpictureDTO the bookpictureDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bookpictureDTO,
     * or with status 400 (Bad Request) if the bookpictureDTO is not valid,
     * or with status 500 (Internal Server Error) if the bookpictureDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bookpictures")
    @Timed
    public ResponseEntity<BookpictureDTO> updateBookpicture(@RequestBody BookpictureDTO bookpictureDTO) throws URISyntaxException {
        log.debug("REST request to update Bookpicture : {}", bookpictureDTO);
        if (bookpictureDTO.getId() == null) {
            return createBookpicture(bookpictureDTO);
        }
        BookpictureDTO result = bookpictureService.save(bookpictureDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bookpictureDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bookpictures : get all the bookpictures.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of bookpictures in body
     */
    @GetMapping("/bookpictures")
    @Timed
    public ResponseEntity<List<BookpictureDTO>> getAllBookpictures(Pageable pageable) {
        log.debug("REST request to get a page of Bookpictures");
        Page<BookpictureDTO> page = bookpictureService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/bookpictures");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /bookpictures/:id : get the "id" bookpicture.
     *
     * @param id the id of the bookpictureDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bookpictureDTO, or with status 404 (Not Found)
     */
    @GetMapping("/bookpictures/{id}")
    @Timed
    public ResponseEntity<BookpictureDTO> getBookpicture(@PathVariable Long id) {
        log.debug("REST request to get Bookpicture : {}", id);
        BookpictureDTO bookpictureDTO = bookpictureService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bookpictureDTO));
    }

    /**
     * DELETE  /bookpictures/:id : delete the "id" bookpicture.
     *
     * @param id the id of the bookpictureDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bookpictures/{id}")
    @Timed
    public ResponseEntity<Void> deleteBookpicture(@PathVariable Long id) {
        log.debug("REST request to delete Bookpicture : {}", id);
        bookpictureService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
