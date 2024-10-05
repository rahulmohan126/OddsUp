import { Modal, Box, Text, Input, Flex, Button } from "@mantine/core";
import { IconHash, IconArrowRight } from "@tabler/icons-react";

import { useState } from "react";

interface JoinGroupChatModalProps {
  opened: boolean;
  close: () => void;
}

export default function JoinGroupChatModal(props: JoinGroupChatModalProps) {
  const { opened, close } = props;
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Join Group" radius={"lg"}>
        <Flex
          align={"center"}
          justify={"center"}
          gap={"md"}
          direction={"column"}
        >
          <Flex direction={"row"} w={"100%"} gap={"md"}>
            <Input
              placeholder="Join Code"
              leftSection={<IconHash size={16} />}
              w={"75%"}
            />
            <Button variant="light" rightSection={<IconArrowRight size={14} />}>
              Join
            </Button>
          </Flex>
          <Text size="sm" c={"gray.7"}>Join a friend's group via its join code.</Text>
        </Flex>
      </Modal>
    </>
  );
}
