import Layout from "./Layout";
import { Link } from "react-router-dom";
import { Card, Button, Badge, Box, Tabs } from "@mantine/core";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaChevronRight, FaGem, FaPlus } from "react-icons/fa6";
import Avatar, { genConfig } from "react-nice-avatar";
import { useDisclosure } from "@mantine/hooks";
import CreateChallenge from "../components/Challenge/CreateChallenge";
import { useParams } from "react-router-dom";
import config from "../../config.json";
import axios from "axios";
import { ChallengeBasic, Group as GroupType, MemberExtended } from "../utils/models";

// Example group data (this would typically come from your API or database)
const groupData = {
  id: "1",
  name: "Dorm 101 Bets",
  description: "Fun challenges for the coolest dorm on campus!",
  members: 42,
  challenges: [
    {
      id: "1",
      question:
        "Will Professor Smith wear his famous bowtie to the lecture this week?",
      votes: 37,
      endDate: "2023-05-20",
    },
    {
      id: "2",
      question:
        "How many slices of pizza will be left at the dorm party on Friday night?",
      votes: 28,
      endDate: "2023-05-22",
    },
    {
      id: "3",
      question:
        "Will the campus squirrels successfully steal food from at least 3 students this week?",
      votes: 56,
      endDate: "2023-05-25",
    },
    {
      id: "4",
      question:
        "What will be the most popular coffee order at the campus café on Monday morning?",
      votes: 41,
      endDate: "2023-05-23",
    },
  ],
};

export default function Group() {
  const [
    openedCreateGroupModal,
    { open: openCreateGroupModal, close: closeCreateGroupModal },
  ] = useDisclosure(false);
  const { id_ } = useParams<string>();

  const [groupName, setGroupName] = useState<string>("");
  const [groupCode, setGroupCode] = useState<string>("");
  const [challenges, setChallenges] = useState<ChallengeBasic[]>([]);
  const [members, setMembers] = useState<MemberExtended[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${config.serverRootURL}/group/getInfo`;
      const body = { groupId: id_ };

      try {
        const res = await axios.post(url, body);
        console.log(res);

        if (!res.data.success) {
          console.log("Error: " + res);
        }

        const groupData = res.data.data as GroupType;

        setGroupName(groupData.name);
        setChallenges(groupData.challenges);
        setGroupCode(groupData.joincode)
        
        groupData.members.sort((a,  b) => b.points - a.points);
        const members = [];
        for (const mem of groupData.members) {
          const url = `${config.serverRootURL}/user/getBasic`;
          const res = await axios.post(url, { userId: mem.userid });

          members.push({
            userid: mem.userid,
            groupid: mem.groupid,
            points: mem.points,
            username: res.data.data.username
          } as MemberExtended);
        }
        setMembers(members);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id_]);

  return (
    <Layout>
      <motion.div
        style={{ height: "100%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="grid grid-cols-1 gap-4 mx-auto px-4 py-8 w-full">
          {/* Main Content */}
          <div className="col-span-2 w-full">
            <motion.div
              className="mb-8 w-full"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-5xl font-bold">{groupName}</h2>
                  <div className="flex flex-row mt-4">
                    <div className="w-fit p-2 hover:opacity-95 transition-all duration-300 ease-in-out">
                      Invite Friends:
                    </div>
                    <div className="text-2xl bg-gray-500 rounded-xl px-2 py-1 font-light">
                      {groupCode}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <Card className="rounded-xl p-10 font-bold text-5xl">
                    {groupName[0]}
                  </Card>
                  <div className="text-sm text-muted-foreground px-2 rounded-full w-fit py-1 font-semibold">
                    {groupData.members} Members
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-row flex-1 flex-wrap gap-10 w-full justify-between">
              <div className="col-span-1 w-fit flex-grow">
                <Tabs defaultValue="all">
                  <Tabs.List>
                    <Tabs.Tab value="all">All Challenges</Tabs.Tab>
                    {/* <Tabs.Tab value="my">My Challenges</Tabs.Tab> */}
                  </Tabs.List>

                  <Tabs.Panel value="all" pt="xs">
                    <h2 className="text-2xl font-semibold mb-4 mt-4">
                      All Challenges
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      {challenges.map((challenge) => (
                        <Link
                          to={"/challenge/" + challenge.id}
                          key={challenge.id}
                        >
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <Card
                              shadow="md"
                              p="lg"
                              className="flex-grow"
                              radius="md"
                              withBorder
                            >
                              <div className="mb-4">
                                {challenge.winner ? (
                                  <Badge color="yellow" variant="light">
                                    Inactive
                                  </Badge>
                                ) : (
                                  <Badge color="blue" variant="light">
                                    Active
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-lg">{challenge.name}</h3>
                              <div className="text-sm text-muted-foreground mt-2">
                                Completed: {challenge.winner ? "Yes!" : "Not yet..."}
                                <br />
                              </div>
                              <div className="flex flex-row items-end justify-end mt-4">
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
                      <CreateChallenge
                        groupId={id_}
                        close={closeCreateGroupModal}
                        opened={openedCreateGroupModal}
                      />
                      <Button
                        onClick={openCreateGroupModal}
                        size="lg"
                        className="hover:shadow-lg transition-shadow duration-300"
                        leftSection={<FaPlus />}
                      >
                        Create New Challenge
                      </Button>
                    </motion.div>
                  </Tabs.Panel>
                  
                  {/*  
                  <Tabs.Panel value="my" pt="xs">
                    <h2 className="text-2xl font-semibold mb-4 mt-4">
                      My Challenges
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      {myChallenges.map((challenge) => (
                        <Link to={"/challenge"} key={challenge.id}>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <Card
                              shadow="md"
                              p="lg"
                              className="max-w-96"
                              radius="md"
                              withBorder
                            >
                              <div className="mb-4">
                                <Badge color="green" variant="light">
                                  My Challenge
                                </Badge>
                              </div>
                              <h3 className="text-lg">{challenge.question}</h3>
                              <div className="text-sm text-muted-foreground mt-2">
                                Votes: {challenge.votes} <br />
                              </div>
                              <div className="flex flex-row items-end justify-end mt-4">
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
                      <CreateChallenge
                        groupId={id_}
                        close={closeCreateGroupModal}
                        opened={openedCreateGroupModal}
                      />
                      <Button
                        onClick={openCreateGroupModal}
                        size="lg"
                        className="hover:shadow-lg transition-shadow duration-300"
                        leftSection={<FaPlus />}
                      >
                        Create New Challenge
                      </Button>
                    </motion.div>
                  </Tabs.Panel>
                  */}
                </Tabs>
              </div>

              {/* Leaderboard */}
              <Box className="col-span-1 w-full md:w-auto">
                <motion.div
                  className="p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
                  <div className="space-y-4">
                    {members.map((member, index) => (
                      <motion.div
                        key={member.userid}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                      >
                        <Card className="flex flex-row items-center justify-between gap-4 p-4">
                          <div className="flex items-center gap-3">
                            <Avatar
                              className="w-12 h-12"
                              {...genConfig(member.username)}
                            />
                            <div>
                              <h3 className="text-lg font-semibold">
                                {member.username}
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-yellow-300">
                            <FaGem />
                            <span className="font-semibold text-lg">
                              {member.points}
                            </span>
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
