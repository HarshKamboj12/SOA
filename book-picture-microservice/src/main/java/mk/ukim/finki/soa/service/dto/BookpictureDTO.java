package mk.ukim.finki.soa.service.dto;


import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Bookpicture entity.
 */
public class BookpictureDTO implements Serializable {

    private Long id;

    @Lob
    private byte[] picture;
    private String pictureContentType;

    private Long bookId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public String getPictureContentType() {
        return pictureContentType;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BookpictureDTO bookpictureDTO = (BookpictureDTO) o;
        if(bookpictureDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bookpictureDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BookpictureDTO{" +
            "id=" + getId() +
            ", picture='" + getPicture() + "'" +
            ", bookId=" + getBookId() +
            "}";
    }
}
