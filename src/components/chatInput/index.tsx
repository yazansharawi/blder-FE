import { KeyboardEvent, useState, useEffect } from "react";
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  InputLeftElement,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";


interface ChatInputProps {
  onSendMessage: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  borderTopColor?: string;
  inputRef: React.RefObject<HTMLInputElement>;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const ChatInput = ({
  onSendMessage,
  onKeyDown,
  inputRef,
  isDisabled,
  isLoading,
}: ChatInputProps) => {
  const [hasText, setHasText] = useState(false);

  useEffect(() => {
    setHasText(!!inputRef.current?.value);
  }, []);

  const handleInputChange = () => {
    setHasText(!!inputRef.current?.value);
  };

  const handleSendClick = () => {
    if (inputRef.current?.value) {
      onSendMessage(inputRef.current.value);
      inputRef.current.value = "";
      setHasText(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    handleInputChange();
  };

  return (
    <InputGroup
      display="flex"
      pr="1rem"
      bg="#F8F8F8"
      backgroundBlendMode="overlay"
      borderRadius="3.3125rem"
    >

      <Input
        w="100%"
        placeholder={"Start typing...."}
        backgroundBlendMode="overlay"
        borderColor="transparent"
        borderRadius="3.3125rem"
        h="3.125rem"
        border={0}
        color="black"
        focusBorderColor="transparent"
        _placeholder={{
          color: "#4B4B4B",
          fontSize: ".875rem",
        }}
        _hover={{ border: "0" }}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        ref={inputRef}
      />

        <InputRightElement
          h="100%"
          display="flex"
          justifyContent="center"
          alignItems={"center"}
          mx=".5rem"
        >
            <IconButton
              aria-label="send message"
              icon={<AiOutlineSend />}
              as="div"
              bg={"mainRed"}
              onClick={handleSendClick}
              isDisabled={isDisabled || !hasText}
              isLoading={isLoading}
              borderRadius="100%"
            />
        </InputRightElement>
    </InputGroup>
  );
};

export default ChatInput
