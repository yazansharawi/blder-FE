import { VStack, Flex } from "@chakra-ui/react";
import ChatBubble from "../chatBubble";
import { useEffect, useRef } from "react";

interface ChatWindowProps {
  messages: Message[];
  isLoading?: boolean;
  loadingText?: string;
}

const ChatWindow = ({ messages, isLoading = false, loadingText = "Thinking..." }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, isLoading]);


  return (
    <Flex p={5} bg={"#F7F7F7"} w={"100%"} borderRadius={"2.5rem"} overflowY={"scroll"} height={"80vh"}  >
      <VStack spacing={4} w="100%" my={"1rem"}>
        {messages.map((message, index) => (
          <ChatBubble
            key={message.id || index}
            message={message.content}
            messageType={message.type}
            metaData={message.metaData}
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
          <div ref={messagesEndRef}/>
      </VStack>
    </Flex>
  );
};

export default ChatWindow;