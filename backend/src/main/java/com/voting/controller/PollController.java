package com.voting.controller;

import com.voting.dto.*;
import com.voting.service.PollService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/polls")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PollController {
    
    @Autowired
    private PollService pollService;
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PollResponse> createPoll(@Valid @RequestBody PollRequest pollRequest) {
        PollResponse poll = pollService.createPoll(pollRequest);
        return ResponseEntity.ok(poll);
    }
    
    @GetMapping
    public ResponseEntity<List<PollResponse>> getAllActivePolls() {
        List<PollResponse> polls = pollService.getAllActivePolls();
        return ResponseEntity.ok(polls);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PollResponse> getPollById(@PathVariable Long id) {
        PollResponse poll = pollService.getPollById(id);
        return ResponseEntity.ok(poll);
    }
    
    @PostMapping("/vote")
    public ResponseEntity<?> vote(@Valid @RequestBody VoteRequest voteRequest) {
        try {
            String message = pollService.vote(voteRequest);
            return ResponseEntity.ok(new MessageResponse(message));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}