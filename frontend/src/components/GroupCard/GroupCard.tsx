import { Paper, Flex, Text } from "@mantine/core";

import LeaderboardPositionProgressBar from "./LeaderboardPositionProgressBar";
import EventCardMini from "./EventCardMini";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";

const eventCardData = [
  {
    eventName: "Bowling",
    vote: "Rahul",
    voteReward: 100,
  },
  {
    eventName: "Fishing",
    vote: "Bob",
    voteReward: 20,
  },
  {
    eventName: "Worst Fit",
    vote: "John",
    voteReward: 40,
  },
];

interface GroupCardProps {
  name: string;
  id_: string;
}

export default function GroupCard(props: GroupCardProps) {
  const navigate = useNavigate();

  const clickCard = (e: any) => {
    e.preventDefault();
    navigate(`/group/${props.id_}`);
  };

  return (
    <Paper
      withBorder={true}
      radius={"md"}
      shadow="sm"
      miw={"376px"}
      maw={"100%"}
      style={{ flexGrow: 1 }}
      p={"md"}
      onClick={clickCard}
    >
      <Flex direction={"column"} w={"100%"} h={"100%"} gap={"lg"}>
        <div className="flex flex-row items-end justify-between">
          <Text size="lg" fw={500}>
            {props.name}
          </Text>
          <FaChevronRight />
        </div>

        <Flex direction={"row"} px={"md"} justify={"center"} gap={"lg"}>
          {eventCardData.map((eventCardData, index) => {
            return (
              <EventCardMini
                key={index}
                eventName={eventCardData.eventName}
                vote={eventCardData.vote}
                voteReward={eventCardData.voteReward}
              />
            );
          })}
        </Flex>

        <LeaderboardPositionProgressBar />
      </Flex>
    </Paper>
  );
}
