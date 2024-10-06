import { Paper, Flex, Text, Avatar } from "@mantine/core";
import { useState } from "react";

interface EventCardMiniProps {
  eventName: string;
  vote: string;
  voteReward: number;
}

export default function EventCardMini(props: EventCardMiniProps) {
  const [eventName, setEventName] = useState(props.eventName);
  const [vote, setVote] = useState(props.vote);
  const [voteReward, setVoteReward] = useState(props.voteReward);

  const getEventAvatar = (eventName: string) => {
    if (eventName === "") {
      return "/";
    }

    return eventName.charAt(0);
  };

  return (
    <Paper
      w={"124px"}
      h={"148px"}
      p={"sm"}
      withBorder={true}
      style={{ borderColor: "gray.4" }}
      shadow="none"
      radius={"lg"}
    >
      <Flex direction={"column"} align={"center"}>
        <Text fw={500}>
          {eventName}
        </Text>
        <Avatar color="cyan" radius="xl" mt={"xs"}>
          {getEventAvatar(eventName)}
        </Avatar>
        <Text fw={500} size="sm" mt={"sm"}>
          Your vote
        </Text>
        <Flex w={"100%"} justify={"center"}>
          <Text size={"xs"} inline>
            {vote} •
          </Text>
          <Text size={"xs"} inline>
            {voteReward}
          </Text>
        </Flex>
      </Flex>
    </Paper>
  );
}
