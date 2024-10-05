import { Flex } from "@mantine/core";
import { Modal, Button, Title } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import { NavbarSimple } from "../components/Navbar/NavbarSimple";
import { HeaderMenu } from "../components/Header/HeaderMenu";
import JoinGroupChatModal from "../components/GroupChatModals/JoinGroupChatModal";
import CreateGroupChatModal from "../components/GroupChatModals/CreateGroupChatModal";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const [
    openedCreateGroupModal,
    { open: openCreateGroupModal, close: closeCreateGroupModal },
  ] = useDisclosure(true);

  const [
    openedJoinGroupModal,
    { open: openJoinGroupModal, close: closeJoinGroupModal },
  ] = useDisclosure(false);

  return (
    <>
      <Flex direction={"row"}>
        <NavbarSimple />
        <Flex direction={"column"} w={"100%"} gap={0}>
          <HeaderMenu />
          <Flex p={"xl"}>{props.children}</Flex>
        </Flex>
      </Flex>

      <JoinGroupChatModal
        opened={openedJoinGroupModal}
        close={closeJoinGroupModal}
      />

      <CreateGroupChatModal
        opened={openedCreateGroupModal}
        close={closeCreateGroupModal}
      />
    </>
  );
}
