import { Paper, Flex, Text } from "@mantine/core";

import LeaderboardPositionProgressBar from "./LeaderboardPositionProgressBar";
import EventCardMini from "./EventCardMini";

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
  return (
    <Paper withBorder={true} radius={"md"} shadow="sm" miw={"376px"} maw={"100%"} style={{flexGrow: 1}} p={"md"}>
      <Flex direction={"column"} w={"100%"} h={"100%"} gap={"lg"}>
        <Text size="lg" fw={500}>
          {props.name}
        </Text>

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
