import { Flex, Text, VStack, Box, Link, Divider, Tag } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
// import { VscRobot } from "react-icons/vsc";

interface Reference {
  title: string;
  subheader: string;
  link: string;
}

interface ChatBubbleProps {
  message: string;
  messageType: string;
  maxWidth?: string;
  isLoading?: boolean;
  loadingText?: string;
  metaData?: Reference[];
}

const ChatBubble = ({
  message,
  messageType,
  isLoading = false,
  loadingText,
  metaData,
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
          gap="0.5rem"
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
              a: ({ href, children }) => (
                <Link href={href} isExternal color="#d60505" textDecoration="underline">
                  {children}
                </Link>
              ),

            }}
          >
            {message}
          </ReactMarkdown>

          {/* Render references if they exist and this is a bot message */}
          {messageType === "bot" && metaData && metaData.length > 0 && (
            <>
              <Divider my={2} />
              <Text fontSize="sm" fontWeight="bold" color="gray.600">
                References:
              </Text>
              <Flex wrap={"wrap"} align="start" width="100%" gap={".5rem"}>
                {metaData.map((reference, index) => (
                  <Tag 
                    key={index} 
                    p={2} 
                    _hover={{ textDecor: "underline", cursor: "pointer" }}
                    width="100%"
                    borderRadius={"40px"}
                    maxW={"8rem"}
                  >
                    <Link href={reference.link} isExternal color="mainRed" fontWeight="bold" isTruncated >
                      {reference.title}
                    </Link>
                  </Tag>
                ))}
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatBubble;