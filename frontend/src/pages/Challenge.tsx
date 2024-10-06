import Layout from "./Layout";
import { Link } from 'react-router-dom';
import { Card, Avatar, Button, Badge, Box, Text, Group, Progress } from '@mantine/core';
import { motion } from 'framer-motion';
import React, { useState } from "react";

const challengeData = {
  id: '1',
  question: 'Will Professor Smith wear his famous bowtie to the lecture this week?',
  creator: {
    name: 'Alex Johnson',
    avatar: '/placeholder.svg?height=40&width=40'
  },
  endDate: '2023-05-20',
  totalVotes: 150,
  options: [
    { id: '1', text: 'Yes, definitely!', votes: 80 },
    { id: '2', text: 'No way!', votes: 50 },
    { id: '3', text: 'Maybe, it\'s a toss-up', votes: 20 }
  ]
};

export default function Challenge() {
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("0");

  const handleVote = (optionId: string) => {
    if (!voted) {
      setSelectedOption(optionId);
      setVoted(true);
    }
  };

  return (
    <Layout>
      <Box className="max-w-4xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card shadow="sm" padding="lg" radius="md" withBorder className="mb-8">
            <Group className="mb-4">
              <Group>
                <Avatar src={challengeData.creator.avatar} radius="xl" />
                <div>
                  <Text size="sm">{challengeData.creator.name}</Text>
                  <Text size="xs" color="dimmed">Challenge Creator</Text>
                </div>
              </Group>
              <Badge color="blue" variant="light">
                Active Challenge
              </Badge>
            </Group>
            <Text size="xl" className="mb-4">
              {challengeData.question}
            </Text>
            <Text size="sm" color="dimmed" className="mb-4">
              Voting ends on {challengeData.endDate}
            </Text>
            <Text size="sm" className="mb-2">
              Cast your vote:
            </Text>
            {challengeData.options.map((option) => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`mb-4 cursor-pointer ${selectedOption === option.id ? 'bg-blue-100 text-black' : ''}`}
                  onClick={() => handleVote(option.id)}
                >
                  <Group>
                    <Text>{option.text}</Text>
                    <Badge color="gray">{option.votes} votes</Badge>
                  </Group>
                  <Progress
                    value={(option.votes / challengeData.totalVotes) * 100}
                    className="mt-2"
                    color={selectedOption === option.id ? 'blue' : 'gray'}
                    animated={true}
                  />
                </Card>
              </motion.div>
            ))}
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Group>
            <Button variant="subtle" component={Link} to="/group">
              Back to Group
            </Button>
            <Button variant="light" component={Link} to="/create-challenge">
              Create New Challenge
            </Button>
          </Group>
        </motion.div>
      </Box>
    </Layout>
  );
}