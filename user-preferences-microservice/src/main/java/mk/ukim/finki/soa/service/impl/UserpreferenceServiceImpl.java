package mk.ukim.finki.soa.service.impl;

import mk.ukim.finki.soa.service.UserpreferenceService;
import mk.ukim.finki.soa.domain.Userpreference;
import mk.ukim.finki.soa.repository.UserpreferenceRepository;
import mk.ukim.finki.soa.service.dto.UserpreferenceDTO;
import mk.ukim.finki.soa.service.mapper.UserpreferenceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Userpreference.
 */
@Service
@Transactional
public class UserpreferenceServiceImpl implements UserpreferenceService{

    private final Logger log = LoggerFactory.getLogger(UserpreferenceServiceImpl.class);

    private final UserpreferenceRepository userpreferenceRepository;

    private final UserpreferenceMapper userpreferenceMapper;

    public UserpreferenceServiceImpl(UserpreferenceRepository userpreferenceRepository, UserpreferenceMapper userpreferenceMapper) {
        this.userpreferenceRepository = userpreferenceRepository;
        this.userpreferenceMapper = userpreferenceMapper;
    }

    /**
     * Save a userpreference.
     *
     * @param userpreferenceDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UserpreferenceDTO save(UserpreferenceDTO userpreferenceDTO) {
        log.debug("Request to save Userpreference : {}", userpreferenceDTO);
        Userpreference userpreference = userpreferenceMapper.toEntity(userpreferenceDTO);
        userpreference = userpreferenceRepository.save(userpreference);
        return userpreferenceMapper.toDto(userpreference);
    }

    /**
     * Get all the userpreferences.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UserpreferenceDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Userpreferences");
        return userpreferenceRepository.findAll(pageable)
            .map(userpreferenceMapper::toDto);
    }

    /**
     * Get one userpreference by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public UserpreferenceDTO findOne(Long id) {
        log.debug("Request to get Userpreference : {}", id);
        Userpreference userpreference = userpreferenceRepository.findOne(id);
        return userpreferenceMapper.toDto(userpreference);
    }

    /**
     * Delete the userpreference by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Userpreference : {}", id);
        userpreferenceRepository.delete(id);
    }
}
