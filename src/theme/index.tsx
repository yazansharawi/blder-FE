import {
    Theme,
    extendTheme,
    ThemeConfig,
  } from "@chakra-ui/react";
import { AlertStyles } from "./components/alert";
  
  
  const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false, 
  };
  
  export const theme: Theme = extendTheme(
    {
      config,
      styles: {
        global: (props: any) => ({
          "html, body": {
            bg: "white",
            color:"black",
          },
          
          '::-webkit-scrollbar': {
          width: '0.3125rem',
          height: '0.3125rem',
          backgroundColor: '#353935	',
        },

        '::-webkit-scrollbar-thumb': {
          background: '#3c3c4399',
          borderRadius: '7.5rem',
        },
        }),
      },
      breakpoints: {
        sm: '28rem',
        md: '48rem',
        lg: '82rem',
        xl: '92rem',
        '2xl': '96rem',
      },
      semanticTokens: {
        colors: {
          mainRed: "#d60505",
          text: "black",
          textSecondary: "#3c3c4399"
        },
      },
      fonts: {
    heading: '"Suisse Intl", sans-serif',
    body: '"Suisse Intl", sans-serif',
      },
      components: {
        Alert: AlertStyles,
      },
    },
  ) as Theme;
