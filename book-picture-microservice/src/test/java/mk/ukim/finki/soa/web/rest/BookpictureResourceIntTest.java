package mk.ukim.finki.soa.web.rest;

import mk.ukim.finki.soa.BookpicturemicroserviceApp;

import mk.ukim.finki.soa.domain.Bookpicture;
import mk.ukim.finki.soa.repository.BookpictureRepository;
import mk.ukim.finki.soa.service.BookpictureService;
import mk.ukim.finki.soa.service.dto.BookpictureDTO;
import mk.ukim.finki.soa.service.mapper.BookpictureMapper;
import mk.ukim.finki.soa.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static mk.ukim.finki.soa.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BookpictureResource REST controller.
 *
 * @see BookpictureResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BookpicturemicroserviceApp.class)
public class BookpictureResourceIntTest {

    private static final byte[] DEFAULT_PICTURE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PICTURE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PICTURE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PICTURE_CONTENT_TYPE = "image/png";

    private static final Long DEFAULT_BOOK_ID = 1L;
    private static final Long UPDATED_BOOK_ID = 2L;

    @Autowired
    private BookpictureRepository bookpictureRepository;

    @Autowired
    private BookpictureMapper bookpictureMapper;

    @Autowired
    private BookpictureService bookpictureService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBookpictureMockMvc;

    private Bookpicture bookpicture;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BookpictureResource bookpictureResource = new BookpictureResource(bookpictureService);
        this.restBookpictureMockMvc = MockMvcBuilders.standaloneSetup(bookpictureResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bookpicture createEntity(EntityManager em) {
        Bookpicture bookpicture = new Bookpicture()
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE)
            .bookId(DEFAULT_BOOK_ID);
        return bookpicture;
    }

    @Before
    public void initTest() {
        bookpicture = createEntity(em);
    }

    @Test
    @Transactional
    public void createBookpicture() throws Exception {
        int databaseSizeBeforeCreate = bookpictureRepository.findAll().size();

        // Create the Bookpicture
        BookpictureDTO bookpictureDTO = bookpictureMapper.toDto(bookpicture);
        restBookpictureMockMvc.perform(post("/api/bookpictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookpictureDTO)))
            .andExpect(status().isCreated());

        // Validate the Bookpicture in the database
        List<Bookpicture> bookpictureList = bookpictureRepository.findAll();
        assertThat(bookpictureList).hasSize(databaseSizeBeforeCreate + 1);
        Bookpicture testBookpicture = bookpictureList.get(bookpictureList.size() - 1);
        assertThat(testBookpicture.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testBookpicture.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);
        assertThat(testBookpicture.getBookId()).isEqualTo(DEFAULT_BOOK_ID);
    }

    @Test
    @Transactional
    public void createBookpictureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bookpictureRepository.findAll().size();

        // Create the Bookpicture with an existing ID
        bookpicture.setId(1L);
        BookpictureDTO bookpictureDTO = bookpictureMapper.toDto(bookpicture);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBookpictureMockMvc.perform(post("/api/bookpictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookpictureDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bookpicture in the database
        List<Bookpicture> bookpictureList = bookpictureRepository.findAll();
        assertThat(bookpictureList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBookpictures() throws Exception {
        // Initialize the database
        bookpictureRepository.saveAndFlush(bookpicture);

        // Get all the bookpictureList
        restBookpictureMockMvc.perform(get("/api/bookpictures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bookpicture.getId().intValue())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))))
            .andExpect(jsonPath("$.[*].bookId").value(hasItem(DEFAULT_BOOK_ID.intValue())));
    }

    @Test
    @Transactional
    public void getBookpicture() throws Exception {
        // Initialize the database
        bookpictureRepository.saveAndFlush(bookpicture);

        // Get the bookpicture
        restBookpictureMockMvc.perform(get("/api/bookpictures/{id}", bookpicture.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bookpicture.getId().intValue()))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)))
            .andExpect(jsonPath("$.bookId").value(DEFAULT_BOOK_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBookpicture() throws Exception {
        // Get the bookpicture
        restBookpictureMockMvc.perform(get("/api/bookpictures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBookpicture() throws Exception {
        // Initialize the database
        bookpictureRepository.saveAndFlush(bookpicture);
        int databaseSizeBeforeUpdate = bookpictureRepository.findAll().size();

        // Update the bookpicture
        Bookpicture updatedBookpicture = bookpictureRepository.findOne(bookpicture.getId());
        // Disconnect from session so that the updates on updatedBookpicture are not directly saved in db
        em.detach(updatedBookpicture);
        updatedBookpicture
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE)
            .bookId(UPDATED_BOOK_ID);
        BookpictureDTO bookpictureDTO = bookpictureMapper.toDto(updatedBookpicture);

        restBookpictureMockMvc.perform(put("/api/bookpictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookpictureDTO)))
            .andExpect(status().isOk());

        // Validate the Bookpicture in the database
        List<Bookpicture> bookpictureList = bookpictureRepository.findAll();
        assertThat(bookpictureList).hasSize(databaseSizeBeforeUpdate);
        Bookpicture testBookpicture = bookpictureList.get(bookpictureList.size() - 1);
        assertThat(testBookpicture.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testBookpicture.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);
        assertThat(testBookpicture.getBookId()).isEqualTo(UPDATED_BOOK_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingBookpicture() throws Exception {
        int databaseSizeBeforeUpdate = bookpictureRepository.findAll().size();

        // Create the Bookpicture
        BookpictureDTO bookpictureDTO = bookpictureMapper.toDto(bookpicture);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBookpictureMockMvc.perform(put("/api/bookpictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookpictureDTO)))
            .andExpect(status().isCreated());

        // Validate the Bookpicture in the database
        List<Bookpicture> bookpictureList = bookpictureRepository.findAll();
        assertThat(bookpictureList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBookpicture() throws Exception {
        // Initialize the database
        bookpictureRepository.saveAndFlush(bookpicture);
        int databaseSizeBeforeDelete = bookpictureRepository.findAll().size();

        // Get the bookpicture
        restBookpictureMockMvc.perform(delete("/api/bookpictures/{id}", bookpicture.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Bookpicture> bookpictureList = bookpictureRepository.findAll();
        assertThat(bookpictureList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bookpicture.class);
        Bookpicture bookpicture1 = new Bookpicture();
        bookpicture1.setId(1L);
        Bookpicture bookpicture2 = new Bookpicture();
        bookpicture2.setId(bookpicture1.getId());
        assertThat(bookpicture1).isEqualTo(bookpicture2);
        bookpicture2.setId(2L);
        assertThat(bookpicture1).isNotEqualTo(bookpicture2);
        bookpicture1.setId(null);
        assertThat(bookpicture1).isNotEqualTo(bookpicture2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BookpictureDTO.class);
        BookpictureDTO bookpictureDTO1 = new BookpictureDTO();
        bookpictureDTO1.setId(1L);
        BookpictureDTO bookpictureDTO2 = new BookpictureDTO();
        assertThat(bookpictureDTO1).isNotEqualTo(bookpictureDTO2);
        bookpictureDTO2.setId(bookpictureDTO1.getId());
        assertThat(bookpictureDTO1).isEqualTo(bookpictureDTO2);
        bookpictureDTO2.setId(2L);
        assertThat(bookpictureDTO1).isNotEqualTo(bookpictureDTO2);
        bookpictureDTO1.setId(null);
        assertThat(bookpictureDTO1).isNotEqualTo(bookpictureDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(bookpictureMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(bookpictureMapper.fromId(null)).isNull();
    }
}
