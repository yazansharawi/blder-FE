import { Box, VStack, Flex } from "@chakra-ui/react";
import ChatBubble from "../chatBubble";

interface ChatWindowProps {
  messages: Message[];
  isLoading?: boolean;
  loadingText?: string;
}

const ChatWindow = ({ messages, isLoading = false, loadingText = "Thinking..." }: ChatWindowProps) => {
  return (
    <Flex p={5} bg={"#F7F7F7"} w={"100%"} borderRadius={"2.5rem"} overflowY={"scroll"} height={"80vh"}>
      <VStack spacing={4} w="100%">
        {messages.map((message, index) => (
          <ChatBubble
            key={message.id || index}
            message={message.content}
            messageType={message.type}
            isLoading={index === messages.length - 1 && isLoading}
            loadingText={loadingText}
          />
        ))}
        {isLoading && messages.length === 0 && (
          <ChatBubble
            message={loadingText}
            messageType="bot"
            isLoading={true}
            loadingText={loadingText}
          />
        )}
      </VStack>
    </Flex>
  );
};

export default ChatWindow;