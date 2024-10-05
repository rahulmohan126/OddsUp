import { createContext, useContext, ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";

import JoinGroupChatModal from "./JoinGroupChatModal";
import CreateGroupChatModal from "./CreateGroupChatModal";

// Define the shape of the context data
interface GroupModalContextProps {
  openCreateGroupModal: () => void;
  openJoinGroupModal: () => void;
}

// Create the context with default values
const GroupModalContext = createContext<GroupModalContextProps | undefined>(
  undefined
);

// Create a hook to access the modal context easily
export const useGroupModalContext = () => {
  const context = useContext(GroupModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

// Create a provider component
interface GroupModalProviderProps {
  children: ReactNode;
}

export const GroupModalProvider = ({ children }: GroupModalProviderProps) => {
  const [
    openedCreateGroupModal,
    { open: openCreateGroupModal, close: closeCreateGroupModal },
  ] = useDisclosure(false);

  const [
    openedJoinGroupModal,
    { open: openJoinGroupModal, close: closeJoinGroupModal },
  ] = useDisclosure(false);

  return (
    <GroupModalContext.Provider
      value={{ openCreateGroupModal, openJoinGroupModal }}
    >
      {children}

      {/* Modals */}
      <JoinGroupChatModal
        opened={openedJoinGroupModal}
        close={closeJoinGroupModal}
      />

      <CreateGroupChatModal
        opened={openedCreateGroupModal}
        close={closeCreateGroupModal}
      />
    </GroupModalContext.Provider>
  );
};
