import { Flex } from "@mantine/core";
import { Modal, Button, Title } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import { NavbarSimple } from "../components/Navbar/NavbarSimple";
import { HeaderMenu } from "../components/Header/HeaderMenu";
import JoinGroupChatModal from "../components/GroupChatModals/JoinGroupChatModal";
import CreateGroupChatModal from "../components/GroupChatModals/CreateGroupChatModal";

import { GroupModalProvider } from "../components/GroupChatModals/GroupModalContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {

  return (
    <>
      <GroupModalProvider>
        <Flex direction={"row"}>
          <NavbarSimple />
          <Flex direction={"column"} w={"100%"} gap={0}>
            <HeaderMenu />
            <Flex p={"xl"}>{props.children}</Flex>
          </Flex>
        </Flex>
      </GroupModalProvider>
    </>
  );
}
