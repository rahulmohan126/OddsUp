import { Paper, Text, Flex, Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useGroupModalContext } from "../GroupChatModals/GroupModalContext";

export default function JoinCreateGroupCard() {
  const { openCreateGroupModal, openJoinGroupModal } = useGroupModalContext();

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
          <Button
            variant="light"
            rightSection={<IconArrowRight size={14} />}
            onClick={openCreateGroupModal}
          >
            Create Group
          </Button>
          <Button
            variant="light"
            rightSection={<IconArrowRight size={14} />}
            onClick={openJoinGroupModal}
          >
            Join Group
          </Button>
        </Flex>
      </Flex>
    </Paper>
  );
}
