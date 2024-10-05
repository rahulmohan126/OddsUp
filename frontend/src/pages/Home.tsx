import Layout from "./Layout";

import GroupCard from "../components/GroupCard/GroupCard";
import { Flex } from "@mantine/core";

export default function Home() {
  return (
    <Layout>
      <div style={{ height: "100%" }}>
        <Flex direction={"row"} gap={"lg"} w={"100%"} wrap={"wrap"}>
          <GroupCard />
          <GroupCard />
          <GroupCard />
        </Flex>
      </div>
    </Layout>
  );
}
