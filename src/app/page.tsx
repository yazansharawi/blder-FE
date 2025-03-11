"use client"

import BottomNavbar from "@/components/bottomNav";
import ChatInput from "@/components/chatInput";
import ChatWindow from "@/components/chatWindow";
import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { Flex, VStack, useToast } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<Message>>([]);
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

  // useEffect(() => {
  //   console.log(messages)
  // }, [messages])

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
    };
    
    // Listen for messages based on the server's structure
    webSocket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        // console.log(response)
        
        // Handle message based on message_type
        switch (response.message_type) {
          case "start":
            console.log("woo")
            const newMessageId = Date.now().toString();
            currentBotMessageId.current = newMessageId;
            setMessages(prevMessages => [...prevMessages, {
              id: newMessageId,
              content: "",
              type: "bot"
            }]);
            break;
            
          case "stream":
            const messageIdToStream = currentBotMessageId.current;
            // Continuation of message (streaming)
            if (messageIdToStream) {
              setMessages(prevMessages => prevMessages.map(msg =>
                msg.id === messageIdToStream
                  ? { ...msg, content: msg.content + (response.message || "") } 
                  : msg
              ));
            }
            break;
            
          case "end":
            const messageIdToUpdate = currentBotMessageId.current;
            if (messageIdToUpdate && response.meta_data) {
              setMessages(prevMessages => prevMessages.map(msg => 
                msg.id === messageIdToUpdate
                  ? { ...msg, metaData: response.meta_data } 
                  : msg // Don't modify other messages
                  ));
            }
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
    };
    
    // Error handling
    webSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current = webSocket;
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);


  useEffect(() => {
    console.log("Component mounted, initializing WebSocket");
    initializeWebSocket();
    
    return () => {
      console.log("Component unmounting, closing WebSocket");
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []);

  const handleSendMessage = (message: string) => {
    // Initialize connection if not already connected
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      initializeWebSocket();
      sendMessageToServer(message);
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
      <Flex gap={"1rem"} transition={"all 0.3s ease"}>
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