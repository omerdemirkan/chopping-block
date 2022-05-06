import { createContext, useCallback, useContext, useState } from "react";
import {
  darkThemeColors,
  lightThemeColors,
  ThemeColors,
} from "../../config/colors";

export type Theme = "light" | "dark";

type ThemeContextState = {
  colors: typeof lightThemeColors;
  bottomTabColors: typeof lightThemeColors;
  setTheme: (theme: Theme) => any;
  setBottomTabTheme: (theme: Theme) => any;
};

const defaultThemeContext: ThemeContextState = {
  colors: lightThemeColors,
  bottomTabColors: lightThemeColors,
  setBottomTabTheme: () => {},
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextState>(defaultThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const [themeState, setThemeState] = useState(defaultThemeContext);
  const setState = useCallback(
    (updates) => setThemeState((prev) => ({ ...prev, ...updates })),
    []
  );
  const setBottomTabTheme = useCallback(
    (theme: Theme) => {
      setState({ bottomTabColors: getColorsFromTheme(theme) });
    },
    [setState]
  );
  const setTheme = useCallback(
    (theme: Theme) => {
      setState({ colors: getColorsFromTheme(theme) });
    },
    [setState]
  );
  return (
    <ThemeContext.Provider
      value={{ ...themeState, setBottomTabTheme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}

const themeColors: { [key in Theme]: ThemeColors } = {
  dark: darkThemeColors,
  light: lightThemeColors,
};
function getColorsFromTheme(theme: Theme): ThemeColors {
  return themeColors[theme];
}
