import Layout from "./Layout";
import { Link } from 'react-router-dom';
import { Card, Avatar, Button, Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import React from "react";

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto px-4 py-8">

          {/* Main Content */}
          <div className="col-span-2">
            <motion.div
              className="mb-8"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-5xl font-bold">{groupData.name}</h2>
                </div>
                <Avatar size="lg" src="/placeholder.svg" alt="Group avatar" radius="xl">{groupData.name[0]}</Avatar>
              </div>
              <div className="text-sm text-muted-foreground">Members: {groupData.members}</div>
              <Button variant="light" fullWidth className="w-fit mt-4 hover:opacity-95 transition-all duration-300 ease-in-out">
                Invite Friends
              </Button>
            </motion.div>

            <h2 className="text-xl font-semibold mb-4">Challenges</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {groupData.challenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card shadow="md" p="lg" radius="md" withBorder>
                    <div className="mb-4">
                      <Badge color="blue" variant="light">Active</Badge>
                    </div>
                    <h3 className="text-lg">{challenge.question}</h3>
                    <div className="text-sm text-muted-foreground mt-2">
                      Votes: {challenge.votes} <br />
                      Ends on: {challenge.endDate}
                    </div>
                    {/* <div className="font-bold text-2xl p-3 bg-zinc-600 h w-fit rounded-full aspect-square flex flex-row items-center justify-center">
                      {challenge.votes}
                    </div> */}
                    <div className="flex flex-rowitems-end justify-end mt-4">
                      <Button variant="outline" color="gray">View Details</Button>
                    </div>
                  </Card>
                </motion.div>
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
          <div className="col-span-1">
            <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
            <div className="space-y-4">
              {leaderboardData.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <Card className="flex flex-row items-start">
                    <Avatar src={user.avatar} alt={user.name} radius="xl" className="mr-4" size="lg" />
                    <div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">Coins: {user.coins}</p>
                    </div>
                    <Button className="ml-auto" variant="outline" color="gray">View Profile</Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
