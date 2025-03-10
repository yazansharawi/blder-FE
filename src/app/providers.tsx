"use client";

import { theme } from "@/theme";
import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        theme={theme}
        toastOptions={{
          defaultOptions: {
            position: 'top',
            duration: 4000,
            isClosable: false,
          },
        }}
      >
        <Suspense fallback={<Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}><Spinner /></Flex>}>{children}</Suspense>
      </ChakraProvider>
    </QueryClientProvider>
  );
}