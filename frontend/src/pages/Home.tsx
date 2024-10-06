import Layout from "./Layout";

import GroupCard from "../components/GroupCard/GroupCard";
import JoinCreateGroupCard from "../components/JoinCreateGroupCard/JoinCreateGroupCard";

import { Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import config from "../../config.json";
import useUser from "../hooks/useUser";
import axios from "axios";

export default function Home() {
  const { user_id } = useUser();
  const [groups, setGroups] = useState<string[]>([]);
  const [groupIds, setGroupIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${config.serverRootURL}/user/getInfo`;
        const body = { userId: localStorage.getItem("user_id") };
        console.log(url, body);

        const res = await axios.post(url, body);

        if (!res.data.success) {
          console.log("Error!", res);
          throw new Error("Failed to get user info");
        }

        console.log(res.data.data.groups);
        setGroups(res.data.data.groups.map((group: any) => group.name));
        setGroupIds(res.data.data.groups.map((group: any) => group.id));
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div style={{ height: "100%" }}>
        <Flex direction={"row"} gap={"lg"} w={"100%"} wrap={"wrap"}>
          {groups.map((group, index) => (
            <GroupCard key={index} name={group} id_={groupIds[index]} />
          ))}
          <JoinCreateGroupCard />
        </Flex>
      </div>
    </Layout>
  );
}
