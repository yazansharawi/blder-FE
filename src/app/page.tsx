"use client"

import ChatInput from "@/components/chatInput";
import ChatWindow from "@/components/chatWindow";
import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

export default function ChatPage() {
  // Dummy chat data
  const dummyMessages = [
    {
      id: "1",
      content: "Hello! How can I assist you today?",
      type: "bot"
    },
    {
      id: "2",
      content: "I need help with my project. Can you explain React hooks?",
      type: "user"
    },
    {
      id: "3",
      content: "Of course! React Hooks are functions that let you use state and other React features without writing a class component. The most common hooks are:\n\n- useState: For managing state in functional components\n- useEffect: For handling side effects\n- useContext: For consuming context\n- useRef: For accessing DOM elements directly\n\nWould you like me to explain any specific hook in more detail?",
      type: "bot"
    },
    {
      id: "4",
      content: "Thank you! Can you give me an example of useState?",
      type: "user"
    },
  ];

  const dummySections = [
    {
      name: "Recent Stocks",
      sessionNames: ["AAPL Analysis", "NVDA Earnings Review", "MSFT Long-Term Outlook"]
    },
    {
      name: "Market Sectors",
      sessionNames: ["Technology", "Healthcare", "Financial Services", "Consumer Goods"]
    },
    {
      name: "Watchlists",
      sessionNames: ["High Growth", "Dividend Champions", "Undervalued Picks", "Clean Energy"]
    },
    {
      name: "Research",
      sessionNames: ["Quarterly Earnings", "Market Trends", "ETF Comparisons", "IPO Calendar"]
    },
    {
      name: "Portfolio Tools",
      sessionNames: ["Risk Assessment", "Diversification Analysis", "Performance Metrics", "Rebalancing Calculator"]
    }
  ];
  

  const [messages, setMessages] = useState(dummyMessages);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulate a loading state and new message after component mounts
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setMessages([...messages, {
        id: "6",
        content: "Is there anything else you'd like to know about React?",
        type: "bot"
      }]);
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (message: string) => {
    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      content: message,
      type: "user" as const
    };
    
    setMessages([...messages, newUserMessage]);
    setIsLoading(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: `You said: "${message}". How can I help you further?`,
        type: "bot" as const
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && inputRef.current?.value) {
      e.preventDefault();
      handleSendMessage(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <Flex 
      height="100vh" 
      width="100%" 
      backgroundColor="#f0f0f0"
      p={4}
      direction={"column"}
    >
      <NavBar />
      <Flex gap={"1rem"}>
      <SideBar
        sections={dummySections}
      />
      <VStack 
        width="100%" 
        spacing={4}
      >
        <ChatWindow 
          messages={messages} 
          isLoading={isLoading} 
          loadingText="The AI is typing..." 
        />
        
        <ChatInput
          onSendMessage={handleSendMessage}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
          isDisabled={isLoading}
          isLoading={isLoading}
        />
      </VStack>
      </Flex>
    </Flex>
  );
}