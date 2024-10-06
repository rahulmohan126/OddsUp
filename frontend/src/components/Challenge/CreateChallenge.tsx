import { Modal, Text, Flex, Button, TextInput, NumberInput, ActionIcon } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useInputState } from "@mantine/hooks";
import { useState } from "react";
import config from "../../../config.json";
import axios from "axios";

interface CreateChallengeProps {
  opened: boolean;
  close: () => void;
  groupId: number;
}

interface Option {
  text: string;
  payout: number;
}

export default function CreateChallenge(props: CreateChallengeProps) {
  const { opened, close } = props;
  const [title, setTitle] = useInputState("");
  const [options, setOptions] = useState<Option[]>([
    { text: null, payout: 10 },
    { text: null, payout: 10 },
  ]);

  const addOption = () => {
    setOptions([...options, { text: null, payout: 10 }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, field: 'text' | 'payout', value: string | number) => {
    const newOptions = [...options];
    newOptions[index][field] = value as never;
    setOptions(newOptions);
  };

  const createChallenge = async (event: React.FormEvent) => {
    event.preventDefault();

    const url = `${config.serverRootURL}/challenge/create`;
    const body = {
      groupId: props.groupId,
      title: title,
      options: options,
    };

    try {
      const res = await axios.post(url, body);
      if (!res.data.success) {
        console.log("Error!", res);
        throw new Error("Challenge creation failed");
      }
      console.log("Successfully created challenge: " + title);
      close();
    } catch (error) {
      console.error("Failed to create challenge:", error);
    }
  };

  return (
    <Modal opened={opened} onClose={close} title="Create Challenge" radius="lg" size="lg">
      <form onSubmit={createChallenge}>
        <Flex direction="column" gap="md">
          <TextInput
            label="Challenge Title"
            placeholder="Enter challenge title"
            value={title}
            onChange={setTitle}
            required
          />

          <Text size="sm" mb={4}>Options</Text>
          {options.map((option, index) => (
            <Flex key={index} gap="sm" align="flex-end">
              <TextInput
                placeholder="Option text"
                value={option.text}
                onChange={(event) => updateOption(index, 'text', event.currentTarget.value)}
                style={{ flex: 1 }}
                required
              />
              <NumberInput
                placeholder="Payout"
                value={option.payout}
                onChange={(value) => updateOption(index, 'payout', value || 10)}
                min={10}
                step={1}
                style={{ width: '100px' }}
                required
              />
              <ActionIcon color="red" onClick={() => removeOption(index)} disabled={options.length <= 2}>
                <IconTrash size="1rem" />
              </ActionIcon>
            </Flex>
          ))}

          <Button
            leftSection={<IconPlus size="1rem" />}
            variant="outline"
            onClick={addOption}
            fullWidth
          >
            Add Option
          </Button>

          <Button type="submit" mt="md">Create Challenge</Button>
        </Flex>
      </form>
    </Modal>
  );
}