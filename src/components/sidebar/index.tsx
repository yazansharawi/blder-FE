import { AddIcon } from "@chakra-ui/icons";
import { Flex, Text, Box, Divider, VStack } from "@chakra-ui/react";

interface Section {
  name: string;
  sessionNames: string[];
}

interface SideBarProps {
  sections: Section[];
}

const SideBar = ({ sections }: SideBarProps) => {
  return (
    <Flex 
      direction={"column"} 
      bg="#FFFFFF" 
      color="white" 
      height="80vh" 
      width="20vw" 
      p={4}
      overflowY="auto"
      borderRadius={"1rem"}
      display={["none", "none", "flex", "flex"]}
    >


      <VStack spacing={6} align="stretch" width="100%">
        {sections.map((section) => (
          <Box key={section.name}>
            <Flex justifyContent={"space-between"}>
            <Text 
              fontWeight="bold" 
              fontSize=".875rem" 
              mb={3} 
              px={2}
              color={"black"}
            >
              {section.name}
            </Text>
            <AddIcon color={"black"} fontSize={".875rem"} />
            </Flex>
            
            <VStack align="stretch" spacing={1}>
              {section.sessionNames.map((sessionName) => (
                <Box
                  key={sessionName}
                  py={1}
                  px={4}
                  cursor="pointer"
                  borderRadius="md"
                  _hover={{ opacity: .8 }}
                >
                  <Text fontSize=".75rem" pl={2} color={"black"}>
                    {sessionName}
                  </Text>
                </Box>
              ))}
            </VStack>
            
            <Divider my={4} borderColor="gray.700" />
          </Box>
        ))}
      </VStack>

      <Box mt="auto" p={2} pt={4}>
        <Text fontSize="sm" color="gray.400">
          © 2025 AI Assistant
        </Text>
      </Box>
    </Flex>
  );
};

export default SideBar;