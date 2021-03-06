package com.assalam.service.impl;

import com.assalam.service.FilesService;
import com.assalam.domain.Files;
import com.assalam.repository.FilesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing files.
 */
@Service
@Transactional
public class FilesServiceImpl implements FilesService {

  private final Logger log = LoggerFactory.getLogger(FilesServiceImpl.class);

  private final FilesRepository filesRepository;

  public FilesServiceImpl(FilesRepository filesRepository) {
    this.filesRepository = filesRepository;
  }

  /**
   * Save a files.
   * 
   * @param files
   *          the entity to save
   * @return the persisted entity
   */
  @Override
  public Files save(Files files) {
    log.debug("Request to save files : {}", files);
    return filesRepository.save(files);
  }

  /**
   * Get all the filess.
   * 
   * @param pageable
   *          the pagination information
   * @return the list of entities
   */
  @Override
  @Transactional(readOnly = true)
  public Page<Files> findAll(Pageable pageable) {
    log.debug("Request to get all filess");
    return filesRepository.findAll(pageable);
  }

  /**
   * Get one files by id.
   * 
   * @param id
   *          the id of the entity
   * @return the entity
   */
  @Override
  @Transactional(readOnly = true)
  public Files findOne(Long id) {
    log.debug("Request to get files : {}", id);
    return filesRepository.findOne(id);
  }

  /**
   * Delete the files by id.
   * 
   * @param id
   *          the id of the entity
   */
  @Override
  public void delete(Long id) {
    log.debug("Request to delete files : {}", id);
    filesRepository.delete(id);
  }
}
