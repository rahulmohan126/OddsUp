import Layout from "./Layout";

import GroupCard from "../components/GroupCard/GroupCard";
import JoinCreateGroupCard from "../components/JoinCreateGroupCard/JoinCreateGroupCard";

import { Flex } from "@mantine/core";
import { useIsAuthenticated } from "../supabase/useIsAuthenticated";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

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
