package com.assalam.repository;

import java.util.List;

import com.assalam.domain.Enfant;
import com.assalam.domain.Kafala;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Kafala entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KafalaRepository extends JpaRepository<Kafala,Long> {
  Page<Kafala> findByKafilId(Pageable pageable, Long kafilId);

  Page<Kafala> findByEnfantId(Pageable pageable, Long enfantId);

  List<Kafala> findByState(String state);

  List<Kafala> findByStartDateContaining(String searchValue);

  List<Kafala> findByStartDateContainingAndState(String datedebut, String state);

  List<Kafala> findByEndDateContainingAndState(String datefin, String state);
}
