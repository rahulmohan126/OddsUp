import { Modal, Box, Text, Input, Flex, Button } from "@mantine/core";
import { IconHash, IconArrowRight, IconAt } from "@tabler/icons-react";

import {
  SegmentedControl,
  TextInput,
  rem,
  Loader,
  Divider,
  Stack,
  Pill,
  InputBase,
} from "@mantine/core";

import { useInputState } from "@mantine/hooks";
import { useState, useEffect } from "react";
import config from "../../../config.json";
import axios from "axios";

function cleanInput(str: string) {
  // Remove non-alphanumeric characters and spaces using a regular expression
  return str
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase()
    .trim();
}

interface CreateGroupChatModalProps {
  opened: boolean;
  close: () => void;
}

export default function CreateGroupChatModal(props: CreateGroupChatModalProps) {
  const { opened, close } = props;

  const [search, setSearch] = useInputState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState<string>("");

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const enterSearch = async () => {
    const newUsername = cleanInput(search);

    if (users.includes(newUsername)) {
      setError("User already included!");
      return;
    }

    if (users.length >= 10) {
      setError("You can only add 10 users!");
      return;
    }

    let nextUsers = [...users, cleanInput(search)];
    setUsers(nextUsers);
    setSearch("");
    setError("");
    console.log(users);
  };

  const deleteUsername = (username: string) => {
    setUsers(users.filter((user) => user !== username));
  };

  const createGroup = async (event: any) => {
    event.preventDefault();

    console.log("triggered")
    
    const url = `${config.serverRootURL}/group/create`;
    const body = {
      name: groupName,
      members: [],
    };
    const res = await axios.post(url, body);

    if (!res.data.success) {
      console.log("Error!", res);
      throw new Error("Group creation failed");
    }

    console.log("Successfully created group: " + groupName);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Group" radius={"lg"}>
        <Flex align={"start"} gap={"md"} direction={"column"}>
          <Text fw={300}>Group Name</Text>
          <Input
            placeholder="My Group"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.currentTarget.value);
            }}
            w={"100%"}
          />
          <Text fw={300}>Add Members</Text>

          <Flex direction={"column"} gap={"sm"} justify={"center"} w={"100%"}>
            <InputBase component="div" multiline w={"100%"}>
              <Pill.Group>
                {users.map((username, index) => (
                  <Pill
                    key={index}
                    withRemoveButton
                    size="md"
                    removeButtonProps={{
                      onClick: () => {
                        deleteUsername(username);
                      },
                    }}
                  >
                    @{username}
                  </Pill>
                ))}
              </Pill.Group>
            </InputBase>
            <TextInput
              mt={"sm"}
              radius="lg"
              variant="outline"
              size="md"
              placeholder="Add a user"
              error={error}
              leftSection={
                <IconAt
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              rightSection={loading ? <Loader size="1rem" /> : null}
              value={search}
              onChange={handleSearch}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  enterSearch();
                }
              }}
            />
          </Flex>
          <Flex direction={"row"} w={"100%"} justify={"end"} gap={"md"}>
            <Button
              variant="light"
              rightSection={<IconArrowRight size={14} />}
              onClick={createGroup}
            >
              Create
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
