package com.voting.repository;

import com.voting.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    Boolean existsByUserIdAndPollId(Long userId, Long pollId);
    
    Optional<Vote> findByUserIdAndPollId(Long userId, Long pollId);
    
    @Query("SELECT COUNT(v) FROM Vote v WHERE v.poll.id = :pollId")
    Integer countVotesByPollId(Long pollId);
    
    @Query("SELECT COUNT(v) FROM Vote v WHERE v.option.id = :optionId")
    Integer countVotesByOptionId(Long optionId);
}