import { Text, Flex, Paper } from "@mantine/core";

export default function LeaderboardPositionProgressBar() {
  const members = 3;
  const position = 2;
  const color = "teal";

  const calculateProgress = (position: number, members: number) => {
    let val : number  = ((members - position + 1) / members) * 100;
    return val > 100 ? 100 : (val < 10 ? 10 : val);
  }

  return (
    <Flex w={"100%"} h={"48px"} justify={"space-between"} align={"center"}>
      <Paper w={"85%"} radius={"xl"} h={"6px"} bg={color + ".0"}>
        <Paper
          w={calculateProgress(position, members) + "%"}
          radius={"xl"}
          h={"6px"}
          shadow="none"
          bg={color + ".4"}
        ></Paper>
      </Paper>
      <Text size="xs" c={"gray.7"}>
        {position} / {members}{" "}
      </Text>
    </Flex>
  );
}
