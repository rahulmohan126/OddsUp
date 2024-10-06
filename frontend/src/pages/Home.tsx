import Layout from "./Layout";

import GroupCard from "../components/GroupCard/GroupCard";
import JoinCreateGroupCard from "../components/JoinCreateGroupCard/JoinCreateGroupCard";

import { Flex } from "@mantine/core";
import { useEffect } from "react";
import config from "../../config.json";
import useUser from "../hooks/useUser";
import axios from "axios";

export default function Home() {


  const { user_id } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${config.serverRootURL}/user/getInfo`;
        const res = await axios.post(url, { userId: user_id })
  
        if (!res.data.success) {
          console.log("Error!", res);
          throw new Error("Failed to get user info");
        }

        console.log(res.data.data.groups)
  
      } catch (error) {
        
      }
    }

    fetchData();
  }, [])
  
  return (
    <Layout>
      <div style={{ height: "100%" }}>
        <Flex direction={"row"} gap={"lg"} w={"100%"} wrap={"wrap"}>
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <JoinCreateGroupCard />
        </Flex>
      </div>
    </Layout>
  );
}
