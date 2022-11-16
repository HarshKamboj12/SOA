package mk.ukim.finki.soa.service.impl;

import mk.ukim.finki.soa.service.BookpictureService;
import mk.ukim.finki.soa.domain.Bookpicture;
import mk.ukim.finki.soa.repository.BookpictureRepository;
import mk.ukim.finki.soa.service.dto.BookpictureDTO;
import mk.ukim.finki.soa.service.mapper.BookpictureMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Bookpicture.
 */
@Service
@Transactional
public class BookpictureServiceImpl implements BookpictureService{

    private final Logger log = LoggerFactory.getLogger(BookpictureServiceImpl.class);

    private final BookpictureRepository bookpictureRepository;

    private final BookpictureMapper bookpictureMapper;

    public BookpictureServiceImpl(BookpictureRepository bookpictureRepository, BookpictureMapper bookpictureMapper) {
        this.bookpictureRepository = bookpictureRepository;
        this.bookpictureMapper = bookpictureMapper;
    }

    /**
     * Save a bookpicture.
     *
     * @param bookpictureDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BookpictureDTO save(BookpictureDTO bookpictureDTO) {
        log.debug("Request to save Bookpicture : {}", bookpictureDTO);
        Bookpicture bookpicture = bookpictureMapper.toEntity(bookpictureDTO);
        bookpicture = bookpictureRepository.save(bookpicture);
        return bookpictureMapper.toDto(bookpicture);
    }

    /**
     * Get all the bookpictures.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BookpictureDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Bookpictures");
        return bookpictureRepository.findAll(pageable)
            .map(bookpictureMapper::toDto);
    }

    /**
     * Get one bookpicture by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BookpictureDTO findOne(Long id) {
        log.debug("Request to get Bookpicture : {}", id);
        Bookpicture bookpicture = bookpictureRepository.findOne(id);
        return bookpictureMapper.toDto(bookpicture);
    }

    /**
     * Delete the bookpicture by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bookpicture : {}", id);
        bookpictureRepository.delete(id);
    }
}
