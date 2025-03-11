"use client"

import BottomNavbar from "@/components/bottomNav";
import ChatInput from "@/components/chatInput";
import ChatWindow from "@/components/chatWindow";
import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { Flex, VStack, useToast } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{id: string, content: string, type: "bot" | "user"}>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const toast = useToast();
  const currentBotMessageId = useRef<string | null>(null);

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

  // Initialize WebSocket connection
  const initializeWebSocket = () => {
    // Don't recreate if already connected
    if (socketRef.current && (socketRef.current.readyState === WebSocket.OPEN || socketRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }
    
    // Create WebSocket connection
    const webSocket = new WebSocket("ws://127.0.0.1:8000/chatbot/stock-market-analysis");
    
    // Connection opened
    webSocket.onopen = () => {
      setIsConnected(true);
      toast({
        title: "Connected to server",
        status: "success",
      });
    };
    
    // Listen for messages based on the server's structure
    webSocket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        console.log("Received:", response);
        
        // Handle message based on message_type
        switch (response.message_type) {
          case "start":
            // Start of a new message
            const newMessageId = Date.now().toString();
            currentBotMessageId.current = newMessageId;
            setMessages(prevMessages => [...prevMessages, {
              id: newMessageId,
              content: "",
              type: "bot"
            }]);
            break;
            
          case "stream":
            // Continuation of message (streaming)
            if (currentBotMessageId.current) {
              setMessages(prevMessages => prevMessages.map(msg => 
                msg.id === currentBotMessageId.current 
                  ? { ...msg, content: msg.content + (response.message || "") } 
                  : msg
              ));
            }
            break;
            
          case "end":
            // End of streaming message
            setIsLoading(false);
            currentBotMessageId.current = null;
            break;
            
          case "error":
            // Error from server
            toast({
              title: "Server error",
              description: response.message || "An error occurred on the server.",
              status: "error",
            });
            setIsLoading(false);
            break;
            
          default:
            // Handle any other message types
            console.log("Unknown message type:", response.message_type);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
        toast({
          title: "Message error",
          description: "Received invalid message format from server.",
          status: "error",
        });
        setIsLoading(false);
      }
    };
    
    // Connection closed
    webSocket.onclose = () => {
      setIsConnected(false);
      toast({
        title: "Disconnected from server",
        description: "The connection to the server was lost.",
        status: "error",
      });
    };
    
    // Error handling
    webSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      toast({
        title: "Connection error",
        description: "Failed to connect to the server. Please try again later.",
        status: "error",
      });
    };

    socketRef.current = webSocket;
  };

  // Clean up WebSocket on component unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const handleSendMessage = (message: string) => {
    // Initialize connection if not already connected
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      initializeWebSocket();
      
      // Add a small delay to ensure the connection is established before sending
      setTimeout(() => {
        sendMessageToServer(message);
      }, 500);
    } else {
      sendMessageToServer(message);
    }
  };

  const sendMessageToServer = (message: string) => {
    // Add user message to chat
    const newUserMessage = {
      id: Date.now().toString(),
      content: message,
      type: "user" as const
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true);
    
    // Check connection again before sending
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        message: message,
        timestamp: new Date().toISOString()
      }));
    } else {
      toast({
        title: "Connection error",
        description: "Cannot send message. Not connected to server.",
        status: "warning",
      });
      setIsLoading(false);
    }
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
        >
          <ChatWindow 
            messages={messages} 
            isLoading={isLoading} 
            loadingText="The AI is analyzing..." 
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