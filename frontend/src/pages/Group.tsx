import Layout from "./Layout";
import { Link } from 'react-router-dom';
import { Card, Button, Badge, Box } from '@mantine/core';
import { motion } from 'framer-motion';
import React from "react";
import { FaChevronRight, FaGem } from "react-icons/fa6";
import Avatar, { genConfig } from 'react-nice-avatar'

// Example group data (this would typically come from your API or database)
const groupData = {
  id: '1',
  name: 'Dorm 101 Bets',
  description: 'Fun challenges for the coolest dorm on campus!',
  members: 42,
  challenges: [
    { id: '1', question: 'Will Professor Smith wear his famous bowtie to the lecture this week?', votes: 37, endDate: '2023-05-20' },
    { id: '2', question: 'How many slices of pizza will be left at the dorm party on Friday night?', votes: 28, endDate: '2023-05-22' },
    { id: '3', question: 'Will the campus squirrels successfully steal food from at least 3 students this week?', votes: 56, endDate: '2023-05-25' },
    { id: '4', question: 'What will be the most popular coffee order at the campus café on Monday morning?', votes: 41, endDate: '2023-05-23' },
  ]
};

// Example leaderboard data
const leaderboardData = [
  { id: '1', name: 'Alex', coins: 120, avatar: '/avatar1.png' },
  { id: '2', name: 'Jordan', coins: 105, avatar: '/avatar2.png' },
  { id: '3', name: 'Taylor', coins: 99, avatar: '/avatar3.png' },
  { id: '4', name: 'Morgan', coins: 88, avatar: '/avatar4.png' },
  { id: '5', name: 'Casey', coins: 77, avatar: '/avatar5.png' },
];

export default function Group() {
  return (
    <Layout>
      <motion.div
        style={{ height: "100%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 gap-4 mx-auto px-4 py-8">

          {/* Main Content */}
          <div className="col-span-2">
            <motion.div
              className="mb-8"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-5xl font-bold">{groupData.name}</h2>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <Card className="rounded-xl p-10 font-bold text-5xl">{groupData.name[0]}</Card>
                  <div className="text-sm text-muted-foreground px-2 rounded-full w-fit py-1 font-semibold">{groupData.members} Members</div>
                </div>
              </div>
              <Button variant="light" fullWidth className="w-fit hover:opacity-95 transition-all duration-300 ease-in-out">
                Invite Friends
              </Button>
            </motion.div>

            <div className="flex flex-row flex-wrap gap-10">
              <div className="col-span-1">

                <h2 className="text-2xl font-semibold mb-4">Challenges</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {groupData.challenges.map((challenge) => (
                    <Link to={'/challenge'}>
                      <motion.div
                        key={challenge.id}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card shadow="md" p="lg" className="max-w-96" radius="md" withBorder>
                          <div className="mb-4">
                            <Badge color="blue" variant="light">Active</Badge>
                          </div>
                          <h3 className="text-lg">{challenge.question}</h3>
                          <div className="text-sm text-muted-foreground mt-2">
                            Votes: {challenge.votes} <br />
                          </div>
                          <div className="flex flex-rowitems-end justify-end mt-4">
                            <FaChevronRight />
                          </div>
                        </Card>
                      </motion.div>
                    </Link>
                  ))}
                </div>
                <motion.div
                  className="mt-8 text-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}

                  transition={{ delay: 0.3 }}
                >
                  <Button component={Link} to="/create-challenge" size="lg" className="hover:shadow-lg transition-shadow duration-300">
                    Create New Challenge
                  </Button>
                </motion.div>
              </div>

              {/* Leaderboard */}
              <Box className="col-span-1">
                <motion.div
                  className="p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
                  <div className="space-y-4">
                    {leaderboardData.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                      >
                        <Card className="flex flex-row items-center justify-between gap-4 p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12" {...genConfig(user.name)} />
                            <div>
                              <h3 className="text-lg font-semibold">{user.name}</h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-yellow-300">
                            <FaGem />
                            <span className="font-semibold text-lg">{user.coins}</span>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Box>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
