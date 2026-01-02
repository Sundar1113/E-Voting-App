package com.voting.dto;

public class VoteRequest {
    private Long pollId;
    private Long optionId;
    
    public VoteRequest() {}
    
    public Long getPollId() { return pollId; }
    public void setPollId(Long pollId) { this.pollId = pollId; }
    
    public Long getOptionId() { return optionId; }
    public void setOptionId(Long optionId) { this.optionId = optionId; }
}