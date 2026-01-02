package com.voting.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.Set;

@Entity
@Table(name = "options")
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String text;
    
    @ManyToOne
    @JoinColumn(name = "poll_id")
    private Poll poll;
    
    @OneToMany(mappedBy = "option", cascade = CascadeType.ALL)
    private Set<Vote> votes;
    
    // Constructors
    public Option() {}
    
    public Option(String text, Poll poll) {
        this.text = text;
        this.poll = poll;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    
    public Poll getPoll() { return poll; }
    public void setPoll(Poll poll) { this.poll = poll; }
    
    public Set<Vote> getVotes() { return votes; }
    public void setVotes(Set<Vote> votes) { this.votes = votes; }
}