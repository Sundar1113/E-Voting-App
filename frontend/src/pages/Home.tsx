import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Poll } from '../types';
import { pollAPI } from '../services/api';
import PollCard from '../components/PollCard';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchPolls();
    }
  }, [isAuthenticated]);

  const fetchPolls = async () => {
    try {
      const data = await pollAPI.getAllPolls();
      setPolls(data);
    } catch (err: any) {
      setError('Failed to fetch polls');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Welcome to Online Voting System
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Please login to view and participate in polls
          </Typography>
        </Box>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Active Polls
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {polls.length === 0 ? (
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No active polls available
          </Typography>
        </Box>
      ) : (
        <Box>
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Home;