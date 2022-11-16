package mk.ukim.finki.soa.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Userpreference entity.
 */
public class UserpreferenceDTO implements Serializable {

    private Long id;

    private String genre;

    @Min(value = 1)
    @Max(value = 10)
    private Integer score;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserpreferenceDTO userpreferenceDTO = (UserpreferenceDTO) o;
        if(userpreferenceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userpreferenceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserpreferenceDTO{" +
            "id=" + getId() +
            ", genre='" + getGenre() + "'" +
            ", score=" + getScore() +
            ", userId=" + getUserId() +
            "}";
    }
}
