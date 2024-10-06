import Layout from "./Layout";

import GroupCard from "../components/GroupCard/GroupCard";
import JoinCreateGroupCard from "../components/JoinCreateGroupCard/JoinCreateGroupCard";

import { Card, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import config from "../../config.json";
import useUser from "../hooks/useUser";
import axios from "axios";
import Avatar, { genConfig } from "react-nice-avatar";
import { motion } from "framer-motion";


export default function Home() {
  const { user_id } = useUser();
  const [groups, setGroups] = useState<string[]>([]);
  const [userData, setUserData] = useState<any>();
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


        console.log(res.data.data);
        setUserData(res.data.data)
        setGroups(res.data.data.groups.map((group: any) => group.name));
        setGroupIds(res.data.data.groups.map((group: any) => group.id));
      } catch (error) { }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div style={{ height: "100%" }}>
        <Flex direction={"row"} gap={"lg"} w={"100%"} wrap={"wrap"}>
          <Card className="px-2 py-2 flex flex-row w-full items-center justify-center gap-5">
            <Avatar
              className="w-32 h-32"
              {...genConfig(userData?.username || "No name")}
            />
            <div className="text-3xl">
              Hi, {userData?.username}
            </div>
          </Card>
          {groups.map((group, index) => (
            <motion.div key={index} className="w-fit cursor-pointer" whileHover={{ scale: 1.02 }}>
              <GroupCard name={group} id_={groupIds[index]} />
            </motion.div>
          ))}
          <JoinCreateGroupCard />
        </Flex>
      </div>
    </Layout>
  );
}
