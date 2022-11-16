package mk.ukim.finki.soa.web.rest;

import com.codahale.metrics.annotation.Timed;
import mk.ukim.finki.soa.service.UserpreferenceService;
import mk.ukim.finki.soa.web.rest.errors.BadRequestAlertException;
import mk.ukim.finki.soa.web.rest.util.HeaderUtil;
import mk.ukim.finki.soa.web.rest.util.PaginationUtil;
import mk.ukim.finki.soa.service.dto.UserpreferenceDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Userpreference.
 */
@RestController
@RequestMapping("/api")
public class UserpreferenceResource {

    private final Logger log = LoggerFactory.getLogger(UserpreferenceResource.class);

    private static final String ENTITY_NAME = "userpreference";

    private final UserpreferenceService userpreferenceService;

    public UserpreferenceResource(UserpreferenceService userpreferenceService) {
        this.userpreferenceService = userpreferenceService;
    }

    /**
     * POST  /userpreferences : Create a new userpreference.
     *
     * @param userpreferenceDTO the userpreferenceDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userpreferenceDTO, or with status 400 (Bad Request) if the userpreference has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/userpreferences")
    @Timed
    public ResponseEntity<UserpreferenceDTO> createUserpreference(@Valid @RequestBody UserpreferenceDTO userpreferenceDTO) throws URISyntaxException {
        log.debug("REST request to save Userpreference : {}", userpreferenceDTO);
        if (userpreferenceDTO.getId() != null) {
            throw new BadRequestAlertException("A new userpreference cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserpreferenceDTO result = userpreferenceService.save(userpreferenceDTO);
        return ResponseEntity.created(new URI("/api/userpreferences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /userpreferences : Updates an existing userpreference.
     *
     * @param userpreferenceDTO the userpreferenceDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userpreferenceDTO,
     * or with status 400 (Bad Request) if the userpreferenceDTO is not valid,
     * or with status 500 (Internal Server Error) if the userpreferenceDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/userpreferences")
    @Timed
    public ResponseEntity<UserpreferenceDTO> updateUserpreference(@Valid @RequestBody UserpreferenceDTO userpreferenceDTO) throws URISyntaxException {
        log.debug("REST request to update Userpreference : {}", userpreferenceDTO);
        if (userpreferenceDTO.getId() == null) {
            return createUserpreference(userpreferenceDTO);
        }
        UserpreferenceDTO result = userpreferenceService.save(userpreferenceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userpreferenceDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /userpreferences : get all the userpreferences.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userpreferences in body
     */
    @GetMapping("/userpreferences")
    @Timed
    public ResponseEntity<List<UserpreferenceDTO>> getAllUserpreferences(Pageable pageable) {
        log.debug("REST request to get a page of Userpreferences");
        Page<UserpreferenceDTO> page = userpreferenceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/userpreferences");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /userpreferences/:id : get the "id" userpreference.
     *
     * @param id the id of the userpreferenceDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userpreferenceDTO, or with status 404 (Not Found)
     */
    @GetMapping("/userpreferences/{id}")
    @Timed
    public ResponseEntity<UserpreferenceDTO> getUserpreference(@PathVariable Long id) {
        log.debug("REST request to get Userpreference : {}", id);
        UserpreferenceDTO userpreferenceDTO = userpreferenceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userpreferenceDTO));
    }

    /**
     * DELETE  /userpreferences/:id : delete the "id" userpreference.
     *
     * @param id the id of the userpreferenceDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/userpreferences/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserpreference(@PathVariable Long id) {
        log.debug("REST request to delete Userpreference : {}", id);
        userpreferenceService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
