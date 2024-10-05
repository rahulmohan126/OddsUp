import { Paper, Text, Flex, Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

export default function JoinCreateGroupCard() {
  return (
    <Paper
      withBorder={true}
      radius={"md"}
      shadow="sm"
      miw={"376px"}
      maw={"100%"}
      style={{ flexGrow: 1 }}
      p={"xl"}
    >
      <Flex
        justify={"center"}
        align={"center"}
        gap={"xl"}
        direction={"column"}
        h={"100%"}
      >
        <Text size="xl" fw={700}>
          Want to join or create a group?
        </Text>
        <Flex direction={"row"} gap={"lg"}>
          <Button variant="light" rightSection={<IconArrowRight size={14} />}>
            Create Group
          </Button>
          <Button variant="light" rightSection={<IconArrowRight size={14} />}>
            Join Group
          </Button>
        </Flex>
      </Flex>
    </Paper>
  );
}
