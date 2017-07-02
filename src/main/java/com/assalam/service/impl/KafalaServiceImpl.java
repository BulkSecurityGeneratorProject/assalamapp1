package com.assalam.service.impl;

import com.assalam.service.KafalaService;
import com.assalam.domain.Kafala;
import com.assalam.domain.Paiement;
import com.assalam.repository.KafalaRepository;
import com.assalam.repository.PaiementRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Kafala.
 */
@Service
@Transactional
public class KafalaServiceImpl implements KafalaService{

    private final Logger log = LoggerFactory.getLogger(KafalaServiceImpl.class);

    private final KafalaRepository kafalaRepository;
    
    @Autowired
    private PaiementRepository paiementRepository;

    public KafalaServiceImpl(KafalaRepository kafalaRepository) {
        this.kafalaRepository = kafalaRepository;
    }

    /**
     * Save a kafala.
     *
     * @param kafala the entity to save
     * @return the persisted entity
     */
    @Override
    public Kafala save(Kafala kafala) {
        log.debug("Request to save Kafala : {}", kafala);
        
        return kafalaRepository.save(kafala);
        
    }

    /**
     *  Get all the kafalas.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Kafala> findAll(Pageable pageable) {
        log.debug("Request to get all Kafalas");
        return kafalaRepository.findAll(pageable);
    }

    /**
     *  Get one kafala by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Kafala findOne(Long id) {
        log.debug("Request to get Kafala : {}", id);
        return kafalaRepository.findOne(id);
    }

    /**
     *  Delete the  kafala by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Kafala : {}", id);
       /* List<Paiement> paiements = paiementRepository.findByKafalaId(id);
        log.debug("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", paiements);
        for(Paiement paiement : paiements){
            paiementRepository.delete(paiement);
        }*/
        kafalaRepository.delete(id);
    }
}
