import { Modal, Box, Text, Input, Flex, Button } from "@mantine/core";
import { IconHash, IconArrowRight } from "@tabler/icons-react";

import { useState } from "react";
import useUser from "../../hooks/useUser";

import config from "../../../config.json";
import axios from "axios";

interface JoinGroupChatModalProps {
  opened: boolean;
  close: () => void;
}

export default function JoinGroupChatModal(props: JoinGroupChatModalProps) {
  const { opened, close } = props;
  const [loading, setLoading] = useState(false);
  const [joinCode, setJoinCode] = useState<string>("");
  const { user_id } = useUser();

  const joinGroupChat = async (event: any) => {
    event.preventDefault();

    console.log(joinCode, user_id);
    const url = `${config.serverRootURL}/group/join`;
    const body = {
      joinCode: joinCode,
      userId: user_id
    };
    try {
      const res = await axios.post(url, body);

      if (!res.data.success) {
        console.log("Error!", res);
        throw new Error("Group join failed");
      }

      console.log("Successfully joined group!");
      close();
    } catch (err) {
      console.log("Error!", err);
    }
  };

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
              value={joinCode}
              onChange={(e) => {
                setJoinCode(e.currentTarget.value);
              }}
            />
            <Button variant="light" rightSection={<IconArrowRight size={14} />} onClick={joinGroupChat}>
              Join
            </Button>
          </Flex>
          <Text size="sm" c={"gray.7"}>
            Join a friend's group via its join code.
          </Text>
        </Flex>
      </Modal>
    </>
  );
}
