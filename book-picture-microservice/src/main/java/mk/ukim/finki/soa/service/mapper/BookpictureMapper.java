package mk.ukim.finki.soa.service.mapper;

import mk.ukim.finki.soa.domain.*;
import mk.ukim.finki.soa.service.dto.BookpictureDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Bookpicture and its DTO BookpictureDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BookpictureMapper extends EntityMapper<BookpictureDTO, Bookpicture> {

    

    

    default Bookpicture fromId(Long id) {
        if (id == null) {
            return null;
        }
        Bookpicture bookpicture = new Bookpicture();
        bookpicture.setId(id);
        return bookpicture;
    }
}
