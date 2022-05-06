import { Text, TextProps } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type FontSize = "S" | "M" | "L";

type TypographyProps = TextProps & {
  size: FontSize;
  color?: string;
};

export const Typography: React.FC<TypographyProps> = ({
  size,
  children,
  color,
  ...textProps
}) => {
  const { colors } = useTheme();
  color = color || colors.fg1;
  return (
    <Text
      {...textProps}
      style={[
        {
          fontSize: getFontSize(size),
          color,
        },
        textProps.style,
      ]}
    >
      {children}
    </Text>
  );
};

const fontSizes: { [key in FontSize]: number } = {
  L: 22,
  M: 18,
  S: 16,
};

export function getFontSize(size: FontSize): number {
  return fontSizes[size];
}
