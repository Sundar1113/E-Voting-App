import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Alert,
  LinearProgress,
  Chip,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Poll } from '../types';
import { pollAPI } from '../services/api';

const PollDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (id) {
      fetchPoll();
    }
  }, [id]);

  const fetchPoll = async () => {
    try {
      const data = await pollAPI.getPollById(Number(id));
      setPoll(data);
    } catch (err: any) {
      setError('Failed to fetch poll details');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async () => {
    if (!selectedOption || !poll) return;

    setVoting(true);
    try {
      await pollAPI.vote({
        pollId: poll.id,
        optionId: Number(selectedOption),
      });
      setSuccess('Vote cast successfully!');
      fetchPoll(); // Refresh poll data
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to cast vote');
    } finally {
      setVoting(false);
    }
  };

  const isActive = () => {
    if (!poll) return false;
    const now = new Date();
    const startTime = new Date(poll.startTime);
    const endTime = new Date(poll.endTime);
    return poll.isActive && now >= startTime && now <= endTime;
  };

  const getVotePercentage = (voteCount: number) => {
    if (!poll || poll.totalVotes === 0) return 0;
    return (voteCount / poll.totalVotes) * 100;
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography>Loading poll...</Typography>
      </Container>
    );
  }

  if (!poll) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Poll not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h4" component="h1">
            {poll.title}
          </Typography>
          <Chip
            label={isActive() ? 'Active' : poll.hasVoted ? 'Voted' : 'Ended'}
            color={isActive() ? 'success' : poll.hasVoted ? 'primary' : 'error'}
          />
        </Box>

        <Typography variant="body1" sx={{ mb: 3 }}>
          {poll.description}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Start: {new Date(poll.startTime).toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            End: {new Date(poll.endTime).toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Votes: {poll.totalVotes}
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        {!poll.hasVoted && isActive() ? (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Cast Your Vote:
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {poll.options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id.toString()}
                    control={<Radio />}
                    label={option.text}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleVote}
                disabled={!selectedOption || voting}
                sx={{ mr: 2 }}
              >
                {voting ? 'Casting Vote...' : 'Cast Vote'}
              </Button>
              <Button variant="outlined" onClick={() => navigate('/')}>
                Back to Polls
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Results:
            </Typography>
            {poll.options.map((option) => (
              <Box key={option.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">{option.text}</Typography>
                  <Typography variant="body2">
                    {option.voteCount} votes ({getVotePercentage(option.voteCount).toFixed(1)}%)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={getVotePercentage(option.voteCount)}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            ))}
            <Button variant="outlined" onClick={() => navigate('/')} sx={{ mt: 2 }}>
              Back to Polls
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PollDetail;