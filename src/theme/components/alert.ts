import { AlertProps } from "@chakra-ui/react";
import { alertAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys);

type Status = "info" | "warning" | "success" | "error";

const baseStyle = definePartsStyle((props: AlertProps) => {
  const { status = "success" } = props as { status: Status };

  const gradientBg = "#03854D";
  const iconColor = "white";
  const textColor = "white";

  const statusStyles = {
    success: {
      container: {
        px: "1rem",
        py: "0.75rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        background: gradientBg,
        color: textColor,
        _first: {
          color: textColor,
        },
      },
      description: {
        color: textColor,
        fontWeight: 400,
        fontSize: "0.75rem",
      },
      icon: {
        color: iconColor,
      },
    },
    warning: {
      container: {
        px: "1rem",
        py: "0.75rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        background: "#FF4D00",
        color: textColor,
        _first: {
          color: textColor,
        },
      },
      description: {
        color: textColor,
        fontWeight: 400,
        fontSize: "0.75rem",
      },
      icon: {
        color: iconColor,
      },
    },
    error: {
      container: {
        px: "1rem",
        py: "0.75rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        background: "#DA2222",
        color: textColor,
        _first: {
          color: textColor,
        },
      },
      description: {
        color: textColor,
        fontWeight: 400,
        fontSize: "0.75rem",
      },
      icon: {
        color: iconColor,
      },
    },
    info: {
      container: {
        px: "1rem",
        py: "0.75rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        background: gradientBg,
        color: textColor,
        _first: {
          color: textColor,
        },
      },
      description: {
        color: textColor,
        fontWeight: 400,
        fontSize: "0.75rem",
      },
      icon: {
        color: iconColor,
      },
    },
  };

  const style = statusStyles[status] || statusStyles.success;

  return style;
});

export const AlertStyles = defineMultiStyleConfig({ baseStyle });