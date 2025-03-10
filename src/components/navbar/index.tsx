"use client";
import { ASSETS } from "@/assets";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  useDisclosure,
  Icon,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="999"
      bg={scrolled ? "white" : "transparent"}
      boxShadow={scrolled ? "sm" : "none"}
      transition="all 0.3s ease"
      my={2.5}
      px={{ base: 0, md: 6, lg: 12 }}
    >
      <Flex
        color="text"
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4, md: 6, lg: 8 }}
        align="center"
        justify="space-between"
      >
        <Flex flex={{ base: 1 }} justify="start">
          <Box as="a" href="/">
            <img
              src={ASSETS.icons.logo}
              alt="nsave logo"
              width="79"
              height="18"
            />
          </Box>
        </Flex>

        <HStack spacing={0} display={{ base: "none", md: "flex" }}>
          <Box>
            <Menu>
              <MenuButton>
                <Icon viewBox="0 0 24 24" w={6} h={6} color="gray.500">
                  <path fill="currentColor" d="M7 10l5 5 5-5z" />
                </Icon>
              </MenuButton>
              <MenuList
                rounded="xl"
                shadow="lg"
                py={2}
                border="1px solid"
                borderColor="gray.100"
                mt={2}
                minW="12.5rem"
              >
                <MenuItem fontSize="md" fontWeight="600" py={3} px={4}>
                  Home
                </MenuItem>
                <MenuItem
                  fontSize="md"
                  fontWeight="400"
                  color="gray.500"
                  py={3}
                  px={4}
                >
                  Pricing
                </MenuItem>
                <MenuItem
                  fontSize="md"
                  fontWeight="400"
                  color="gray.500"
                  py={3}
                  px={4}
                >
                  About
                </MenuItem>
                <MenuItem
                  fontSize="md"
                  fontWeight="400"
                  color="gray.500"
                  py={3}
                  px={4}
                >
                  Careers
                </MenuItem>
                <MenuItem
                  fontSize="md"
                  fontWeight="400"
                  color="gray.500"
                  py={3}
                  px={4}
                >
                  Blog
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Button
            as="a"
            href="https://apps.apple.com/gb/app/nsave/id6471736519"
            bg="mainRed"
            color="white"
            px=".75rem"
            py=".75rem"
            lineHeight=".75rem"
            fontSize=".8125rem"
            letterSpacing="0"
            fontWeight="600"
            borderRadius="6.25rem"
            _hover={{
              bg: "#b30404",
            }}
            transition="color .15s, background-color .15s"
            mx={2}
          >
            Download
          </Button>
        </HStack>

        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          icon={
            isOpen ? (
              <Icon viewBox="0 0 24 24" w={5} h={5}>
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </Icon>
            ) : (
              <Icon viewBox="0 0 24 24" w={6} h={6}>
                <path fill="currentColor" d="M3 8h18v2H3V8zm0 5h18v2H3v-2z" />
              </Icon>
            )
          }
          variant="ghost"
          borderRadius="md"
          color="gray.500"
          aria-label="Toggle Navigation"
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg="white"
          p={4}
          py={6}
          display={{ base: isOpen ? "block" : "none", md: "none" }}
          borderBottomWidth="1px"
          borderBottomColor="gray.200"
          spacing={4}
        >
          <Box py={2} as="a" href="/" onClick={onToggle}>
            <Text fontWeight={600} fontSize="md">
              Home
            </Text>
          </Box>
          <Box py={2} as="a" href="/pricing" onClick={onToggle}>
            <Text fontWeight={400} fontSize="md" color="gray.500">
              Pricing
            </Text>
          </Box>
          <Box py={2} as="a" href="/about" onClick={onToggle}>
            <Text fontWeight={400} fontSize="md" color="gray.500">
              About
            </Text>
          </Box>
          <Box py={2} as="a" href="/careers" onClick={onToggle}>
            <Text fontWeight={400} fontSize="md" color="gray.500">
              Careers
            </Text>
          </Box>
          <Box py={2} as="a" href="/blog" onClick={onToggle}>
            <Text fontWeight={400} fontSize="md" color="gray.500">
              Blog
            </Text>
          </Box>
        </Stack>
      </Collapse>
    </Box>
  );
}
