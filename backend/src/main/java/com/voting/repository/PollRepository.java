package com.voting.repository;

import com.voting.entity.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {
    List<Poll> findByIsActiveTrueOrderByCreatedAtDesc();
    
    @Query("SELECT p FROM Poll p WHERE p.isActive = true AND p.startTime <= :now AND p.endTime >= :now")
    List<Poll> findActivePolls(LocalDateTime now);
    
    List<Poll> findByCreatedByIdOrderByCreatedAtDesc(Long userId);
}