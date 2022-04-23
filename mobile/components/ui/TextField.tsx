import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { colors } from "../../config/colors";
import { getFontSize, Typography } from "./Typography";

type TextFieldProps = TextInputProps & {
  label?: string;
  labelColor?: string;
};

export const TextField: React.FC<TextFieldProps> = ({
  label,
  labelColor = colors.fg1,
  ...textInputProps
}) => {
  return (
    <View>
      {label && (
        <Typography style={{ color: labelColor }} size="M">
          {label}
        </Typography>
      )}
      <TextInput
        {...textInputProps}
        style={[styles.textInput, textInputProps.style]}
        placeholderTextColor={colors.fg3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: getFontSize("S"),
  },
});
