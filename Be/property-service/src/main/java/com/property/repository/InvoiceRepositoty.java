package com.property.repository;

import com.property.entity.Invoice;
import com.property.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface InvoiceRepositoty extends JpaRepository<Invoice, String> {

    Optional<Invoice> findByMonthAndYearAndRoom(int month, int year, Room room);


    Optional<Invoice> findByRoom(Room room);

    @Query("SELECT COUNT(i) " +
            "FROM Invoice i WHERE (i.month > ?1 OR (i.month = ?1 AND i.year > ?2)) AND i.room = ?3")
    Long checkFutureInvoiceExists(int month, int year, Room room);

}
