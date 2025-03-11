import { Theme, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { AlertStyles } from "./components/alert";
import '@fontsource-variable/geist';

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme: Theme = extendTheme(
  {
    config,
    styles: {
      global: (props: any) => ({
        "html, body": {
          bg: "white",
          color: "black",
          fontFamily: "'Geist Variable', sans-serif"
        },
        "::-webkit-scrollbar": {
          width: "0rem",
          height: "0rem",
          backgroundColor: "#353935",
          borderRadius: "7.5rem",
        },
        "::-webkit-scrollbar-thumb": {
          background: "red",
          borderRadius: "7.5rem",
        },
      }),
    },
    breakpoints: {
      sm: "28rem",
      md: "48rem",
      lg: "82rem",
      xl: "92rem",
      "2xl": "96rem",
    },
    semanticTokens: {
      colors: {
        mainRed: "#d60505",
        text: "black",
        textSecondary: "#3c3c4399",
      },
    },
    fonts: {
      heading: "'Geist Variable', sans-serif",
      body: "'Geist Variable', sans-serif",
    },
    components: {
      Alert: AlertStyles,
    },
  }
) as Theme;
