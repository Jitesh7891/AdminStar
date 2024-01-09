// color design tokens
export const tokensDark = {
  grey: {
    0: "#000000",
    10: "#141414",
    50: "#292929",
    100: "#3d3d3d",
    200: "#525252",
    300: "#666666",
    400: "#858585",
    500: "#a3a3a3",
    600: "#c2c2c2",
    700: "#e0e0e0",
    800: "#f0f0f0",
    900: "#ffffff",
    1000: "#000000",
  },
  primary: {
    // blue
    100: "#b8d4de",
    200: "#91a9be",
    300: "#6b7f9d",
    400: "#45547d",
    500: "#1f295c",
    600: "#191F45",
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
  secondary: {
    // green
    50: "#f0f0f0",
    100: "#d3f6e0",
    200: "#a6edc2",
    300: "#7affe3",
    400: "#4affda",
    500: "#16ffd1",
    600: "#52cca7",
    700: "#3d997d",
    800: "#296654",
    900: "#14332a",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[500],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: "#ffffff", // white
              light: "#f0f0f0", // light grey
            },
            secondary: {
              ...tokensLight.secondary,
              main: "#52cca7", // adjusted for green
              light: "#3d997d", // adjusted for lighter green
            },
            neutral: {
              ...tokensLight.grey,
              main: "#000000", // avoid using black in light mode
            },
            background: {
              default: "#ffffff", // white
              alt: "#f0f0f0", // light grey
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
