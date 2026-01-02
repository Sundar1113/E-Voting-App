package com.voting.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "votes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "poll_id"})
})
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "poll_id")
    private Poll poll;
    
    @ManyToOne
    @JoinColumn(name = "option_id")
    private Option option;
    
    @Column(name = "voted_at")
    private LocalDateTime votedAt = LocalDateTime.now();
    
    // Constructors
    public Vote() {}
    
    public Vote(User user, Poll poll, Option option) {
        this.user = user;
        this.poll = poll;
        this.option = option;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public Poll getPoll() { return poll; }
    public void setPoll(Poll poll) { this.poll = poll; }
    
    public Option getOption() { return option; }
    public void setOption(Option option) { this.option = option; }
    
    public LocalDateTime getVotedAt() { return votedAt; }
    public void setVotedAt(LocalDateTime votedAt) { this.votedAt = votedAt; }
}