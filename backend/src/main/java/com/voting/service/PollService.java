package com.voting.service;

import com.voting.dto.*;
import com.voting.entity.*;
import com.voting.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PollService {
    
    @Autowired
    private PollRepository pollRepository;
    
    @Autowired
    private OptionRepository optionRepository;
    
    @Autowired
    private VoteRepository voteRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public PollResponse createPoll(PollRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Poll poll = new Poll(request.getTitle(), request.getDescription(), 
                           request.getStartTime(), request.getEndTime(), user);
        poll = pollRepository.save(poll);
        
        for (String optionText : request.getOptions()) {
            Option option = new Option(optionText, poll);
            optionRepository.save(option);
        }
        
        return convertToPollResponse(poll, user.getId());
    }
    
    public List<PollResponse> getAllActivePolls() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        
        List<Poll> polls = pollRepository.findActivePolls(LocalDateTime.now());
        return polls.stream()
                .map(poll -> convertToPollResponse(poll, userPrincipal.getId()))
                .collect(Collectors.toList());
    }
    
    public PollResponse getPollById(Long pollId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new RuntimeException("Poll not found"));
        
        return convertToPollResponse(poll, userPrincipal.getId());
    }
    
    @Transactional
    public String vote(VoteRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        
        // Check if user already voted
        if (voteRepository.existsByUserIdAndPollId(userPrincipal.getId(), request.getPollId())) {
            throw new RuntimeException("You have already voted in this poll");
        }
        
        Poll poll = pollRepository.findById(request.getPollId())
                .orElseThrow(() -> new RuntimeException("Poll not found"));
        
        // Check if poll is active and within time range
        LocalDateTime now = LocalDateTime.now();
        if (!poll.getIsActive() || now.isBefore(poll.getStartTime()) || now.isAfter(poll.getEndTime())) {
            throw new RuntimeException("Poll is not active or voting period has ended");
        }
        
        Option option = optionRepository.findById(request.getOptionId())
                .orElseThrow(() -> new RuntimeException("Option not found"));
        
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Vote vote = new Vote(user, poll, option);
        voteRepository.save(vote);
        
        return "Vote cast successfully";
    }
    
    private PollResponse convertToPollResponse(Poll poll, Long userId) {
        PollResponse response = new PollResponse();
        response.setId(poll.getId());
        response.setTitle(poll.getTitle());
        response.setDescription(poll.getDescription());
        response.setStartTime(poll.getStartTime());
        response.setEndTime(poll.getEndTime());
        response.setIsActive(poll.getIsActive());
        response.setHasVoted(voteRepository.existsByUserIdAndPollId(userId, poll.getId()));
        response.setTotalVotes(voteRepository.countVotesByPollId(poll.getId()));
        
        List<OptionResponse> options = optionRepository.findByPollId(poll.getId())
                .stream()
                .map(option -> {
                    OptionResponse optionResponse = new OptionResponse();
                    optionResponse.setId(option.getId());
                    optionResponse.setText(option.getText());
                    optionResponse.setVoteCount(voteRepository.countVotesByOptionId(option.getId()));
                    return optionResponse;
                })
                .collect(Collectors.toList());
        
        response.setOptions(options);
        return response;
    }
}