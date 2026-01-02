import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
  Chip,
} from '@mui/material';
import { Poll } from '../types';
import { useNavigate } from 'react-router-dom';

interface PollCardProps {
  poll: Poll;
}

const PollCard: React.FC<PollCardProps> = ({ poll }) => {
  const navigate = useNavigate();

  const isActive = () => {
    const now = new Date();
    const startTime = new Date(poll.startTime);
    const endTime = new Date(poll.endTime);
    return poll.isActive && now >= startTime && now <= endTime;
  };

  const getStatusChip = () => {
    if (!poll.isActive) {
      return <Chip label="Inactive" color="default" size="small" />;
    }
    
    const now = new Date();
    const startTime = new Date(poll.startTime);
    const endTime = new Date(poll.endTime);
    
    if (now < startTime) {
      return <Chip label="Upcoming" color="info" size="small" />;
    } else if (now > endTime) {
      return <Chip label="Ended" color="error" size="small" />;
    } else {
      return <Chip label="Active" color="success" size="small" />;
    }
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            {poll.title}
          </Typography>
          {getStatusChip()}
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {poll.description}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Start: {new Date(poll.startTime).toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            End: {new Date(poll.endTime).toLocaleString()}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Total Votes: {poll.totalVotes}
          </Typography>
          {poll.hasVoted && (
            <Chip label="You have voted" color="primary" size="small" />
          )}
        </Box>
        
        <Button
          variant="contained"
          onClick={() => navigate(`/poll/${poll.id}`)}
          disabled={!isActive() && !poll.hasVoted}
          fullWidth
        >
          {poll.hasVoted ? 'View Results' : 'Vote Now'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PollCard;