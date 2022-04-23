import { Text, TextProps } from "react-native";
import { colors } from "../../config/colors";

type FontSize = "S" | "M" | "L";

type TypographyProps = TextProps & {
  size: FontSize;
  color?: string;
};

export const Typography: React.FC<TypographyProps> = ({
  size,
  children,
  color = colors.fg1,
  ...textProps
}) => {
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
