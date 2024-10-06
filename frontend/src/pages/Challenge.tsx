import Layout from "./Layout";
import { Link } from 'react-router-dom';
import { Card, Button, Badge, Box, Text, Group, Progress, Tooltip, ScrollArea } from '@mantine/core';
import { motion } from 'framer-motion';
import React, { useState } from "react";
import Avatar, { genConfig } from 'react-nice-avatar'

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
    { id: '1', text: 'Yes, definitely!', votes: 80, voters: ['User1', 'User2', 'User3', 'User4', 'User5', 'User6', 'User7', 'User8'] },
    { id: '2', text: 'No way!', votes: 50, voters: ['User9', 'User10', 'User11', 'User12', 'User13'] },
    { id: '3', text: 'Maybe, it\'s a toss-up', votes: 20, voters: ['User14', 'User15'] }
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
      <Box className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            className="flex-grow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card shadow="sm" padding="lg" radius="md" withBorder className="mb-8">
              <Group className="mb-4">
                <Group>
                  <Avatar className="w-12 h-12" {...genConfig(challengeData.creator.name)} />
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
                      {voted && <Badge color="gray">{option.votes} votes</Badge>}
                    </Group>
                    {
                      voted &&
                      <Progress
                        value={(option.votes / challengeData.totalVotes) * 100}
                        className="mt-2"
                        color={selectedOption === option.id ? 'blue' : 'gray'}
                        animated={false}
                      />
                    }
                  </Card>
                </motion.div>
              ))}
            </Card>
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
          </motion.div>

          {voted && (
            <motion.div
              className="w-full md:w-64"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text size="lg" className="mb-4 font-normal">Individual Votes</Text>
                <ScrollArea style={{ height: 400 }}>
                  {challengeData.options.map((option) => (
                    <div key={option.id} className="mb-4">
                      <Text size="sm" className="mb-2 font-medium">{option.text}</Text>
                      <Group>
                        {option.voters.map((voter, index) => (
                          <Tooltip key={index} label={voter} withArrow>
                            <div>
                              <Avatar className="w-8 h-8" {...genConfig(voter)} />
                            </div>
                          </Tooltip>
                        ))}
                      </Group>
                    </div>
                  ))}
                </ScrollArea>
              </Card>
            </motion.div>
          )}
        </div>
      </Box>
    </Layout>
  );
}