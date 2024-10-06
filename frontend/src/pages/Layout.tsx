import { Flex } from "@mantine/core";
import { NavbarSimple } from "../components/Navbar/NavbarSimple";
// import { HeaderMenu } from "../components/Header/HeaderMenu";

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
            {/* <HeaderMenu /> */}
            <Flex>{props.children}</Flex>
          </Flex>
        </Flex>
      </GroupModalProvider>
    </>
  );
}
