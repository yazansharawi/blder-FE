import { Flex, Text } from "@chakra-ui/react";

import ReactMarkdown from "react-markdown";
// import { VscRobot } from "react-icons/vsc";

interface ChatBubbleProps {
  message: string;
  messageType: string;
  maxWidth?: string;
  isLoading?: boolean;
  loadingText?: string;
}

const ChatBubble = ({
  message,
  messageType,
  isLoading = false,
  loadingText,
}: ChatBubbleProps) => {
  return (
    <Flex
      w="100%"
      justifyContent={messageType === "user" ? "flex-end" : "flex-start"}
      position={"relative"}
    >
      <Flex>
        {/* {messageType === "bot" && (
          <Box position={"absolute"} bottom={0}>
            <VscRobot />
          </Box>
        )} */}

        <Flex
          fontSize="1rem"
          color={messageType === "bot" ? "black" : "white"}
          p={"1rem"}
          direction="column"
          gap="0rem"
          alignItems="start"
          bg={messageType === "bot" ? "white" : "mainRed"}
          borderTopRadius={"1rem"}
          borderBottomLeftRadius={messageType === "user" ? "1rem" : "0"}
          borderBottomRightRadius={messageType === "bot" ? "1rem" : "0"}
        >
          <ReactMarkdown
            components={{
              ul: ({ children }) => (
                <Text as="ul" pl={5} listStyleType="disc">
                  {children}
                </Text>
              ),
              li: ({ children }) => (
                <Text as="li" pl={2}>
                  {children}
                </Text>
              ),
              ol: ({ children }) => (
                <Text as="ol" pl={5} listStyleType="decimal">
                  {children}
                </Text>
              ),
            }}
          >
            {message}
          </ReactMarkdown>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatBubble;
