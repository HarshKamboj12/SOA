package mk.ukim.finki.soa.service.mapper;

import mk.ukim.finki.soa.domain.*;
import mk.ukim.finki.soa.service.dto.UserpreferenceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Userpreference and its DTO UserpreferenceDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UserpreferenceMapper extends EntityMapper<UserpreferenceDTO, Userpreference> {

    

    

    default Userpreference fromId(Long id) {
        if (id == null) {
            return null;
        }
        Userpreference userpreference = new Userpreference();
        userpreference.setId(id);
        return userpreference;
    }
}
