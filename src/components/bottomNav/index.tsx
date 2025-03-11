import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { Home, Search, Heart, User } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isSelected, onClick }: NavItemProps) => {
  const selectedColor = "mainRed";
  const unselectedColor = "textSecondary";

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      flex={1}
      py={2}
      onClick={onClick}
      cursor="pointer"
      color={isSelected ? selectedColor : unselectedColor}
      transition="all 0.2s"
    >
      <Box mb={1}>
        {icon}
      </Box>
      <Text fontSize="xs" fontWeight={isSelected ? "bold" : "normal"}>
        {label}
      </Text>
    </Flex>
  );
};

export default function BottomNavbar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const navItems = [
    { icon: <Home size={24} />, label: "Home" },
    { icon: <Search size={24} />, label: "Search" },
    { icon: <Heart size={24} />, label: "Favorites" },
    { icon: <User size={24} />, label: "Profile" },
  ];

  return (
    <Box
      bg={"white"}
      boxShadow="0 -2px 10px rgba(0, 0, 0, 0.05)"
      w={"100%"}
    >
      <Flex width="100%" justify="space-between">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            isSelected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </Flex>
    </Box>
  );
}