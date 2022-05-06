import { Slider } from "@miblanchard/react-native-slider";
import { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../config/colors";
import { Screen } from "../ui/Screen";
import { TextField } from "../ui/TextField";
import { Typography } from "../ui/Typography";
import parser from "any-date-parser";

export function TaskCreationScreen() {
  const [importance, setImportance] = useState<number>(INITIAL_IMPORTANCE);
  const [taskName, setTaskName] = useState<null | string>(null);
  const [taskDue, setTaskDue] = useState<null | undefined | Date>(null);
  const [timeCommitment, setTimeCommitment] = useState<number>(
    INITIAL_TIME_COMMITMENT
  );
  const handleTaskInputComplete = useCallback(({ due, task }: TaskStrData) => {
    setTaskName(task);
    setTaskDue(due);
  }, []);
  const handleTimeCommitmentInputComplete = useCallback((minutes) => {
    setTimeCommitment(minutes);
  }, []);
  return (
    <Screen hasHorizontalPadding>
      <View style={{ marginVertical: 20 }}>
        <TaskInput onInputComplete={handleTaskInputComplete} />
      </View>
      <Typography size="M">
        {taskDue ? taskDue.toString() : "No due date given"}
      </Typography>
      <View style={{ marginVertical: 20 }}>
        <ImportanceInput
          initialValue={importance}
          onInputComplete={setImportance}
        />
      </View>
      <View style={{ marginVertical: 20 }}>
        <TimeCommitmentInput
          onInputComplete={handleTimeCommitmentInputComplete}
        />
      </View>
    </Screen>
  );
}

type TaskStrData = {
  task: string;
  due?: Date;
};

type TaskInputProps = {
  onInputComplete?: (info: TaskStrData) => void;
};

const TaskInput: React.FC<TaskInputProps> = ({ onInputComplete }) => {
  const [taskStr, setTaskStr] = useState("");
  const taskStrRef = useRef(taskStr);
  taskStrRef.current = taskStr;
  const handleBlur = useCallback(() => {
    const taskStrData = taskStrToTaskStrData(taskStrRef.current);
    onInputComplete?.(taskStrData);
  }, [onInputComplete]);
  return (
    <View>
      <TextField
        autoFocus
        value={taskStr}
        onChangeText={setTaskStr}
        placeholder="E.g Call dad by tomorrow 5pm"
        onBlur={handleBlur}
      />
    </View>
  );
};

type ImportanceInputProps = {
  initialValue: number;
  onInputComplete: (importance: number) => void;
};

const importances = [
  "Would be nice",
  "Pretty important",
  "Quite important",
  "Really important",
  "Crucial!",
];

const ImportanceInput: React.FC<ImportanceInputProps> = ({
  initialValue = 0.5,
  onInputComplete,
}) => {
  const [importance, setImportance] = useState(initialValue);
  const handleValueChange = useCallback((value) => {
    setImportance(value);
  }, []);
  const handleSlidingComplete = useCallback(
    (value) => {
      onInputComplete?.(value);
    },
    [onInputComplete]
  );
  const importanceDescription = getImportanceDescription(importance);
  return (
    <View>
      <View style={styles.importanceSliderHeader}>
        <Typography size="S">
          Importance: {Math.round(importance * 100)}%
        </Typography>

        <Typography size="S" color={colors.fg2}>
          {importanceDescription}
        </Typography>
      </View>
      <Slider
        value={importance}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
      />
    </View>
  );
};

type TimtCommitmentInputProps = {
  initialValue?: number;
  onInputComplete: (importance: number) => void;
};

const TimeCommitmentInput: React.FC<TimtCommitmentInputProps> = ({
  initialValue = 0.5,
  onInputComplete,
}) => {
  const [sliderValue, setSliderValue] = useState(initialValue);
  const handleValueChange = useCallback((value) => {
    setSliderValue(value);
  }, []);
  const handleSlidingComplete = useCallback(
    (value) => {
      const minutes = fracToMinutesTimeCommitment(value);
      onInputComplete?.(minutes);
    },
    [onInputComplete]
  );
  const minutes = fracToMinutesTimeCommitment(sliderValue);
  const description = minutesToDescription(minutes);
  return (
    <View>
      <View style={styles.importanceSliderHeader}>
        <Typography size="S">Time Commitment</Typography>

        <Typography size="S" color={colors.fg2}>
          {description}
        </Typography>
      </View>
      <Slider
        value={sliderValue}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  importanceSliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

function getTaskStrData(taskStr: string): TaskStrData {
  return {
    task: taskStr,
    due: new Date(),
  };
}

const timeCommitmentOptions = [
  5,
  10,
  15,
  20,
  30,
  45,
  60,
  60 + 15,
  60 + 30,
  2 * 60,
  2 * 60 + 30,
  3 * 60,
  3 * 60 + 30,
  4 * 60,
  4 * 60 + 30,
  5 * 60,
  6 * 60,
  7 * 60,
  8 * 60,
  9 * 60,
  10 * 60,
];

const INITIAL_IMPORTANCE = 0.5;
const INITIAL_TIME_COMMITMENT =
  timeCommitmentOptions[
    Math.min(
      timeCommitmentOptions.length - 1,
      Math.floor(0.5 * timeCommitmentOptions.length)
    )
  ];

function fracToMinutesTimeCommitment(frac: number): number {
  return timeCommitmentOptions[
    Math.min(
      timeCommitmentOptions.length - 1,
      Math.floor(frac * timeCommitmentOptions.length)
    )
  ];
}

function minutesToDescription(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const strBuilder: string[] = [];
  if (hours) {
    strBuilder.push(`${hours}h`);
  }

  if (minutes) {
    strBuilder.push(`${minutes}m`);
  }

  return strBuilder.join(", ");
}

function getImportanceDescription(importance: number) {
  return importances[
    Math.floor(
      Math.min(importance * importances.length, importances.length - 1)
    )
  ];
}

const taskDueDateSeparators = ["by", "due", "before", "at"];

function taskStrToTaskStrData(taskInput: string): TaskStrData {
  // TODO: extract due date from task description.

  const separator = taskDueDateSeparators.find((separator) =>
    taskInput.includes(` ${separator} `)
  );

  if (!separator) {
    return { task: taskInput };
  }

  const taskEndIndex = taskInput.indexOf(` ${separator} `);
  const dateStartIndex = taskEndIndex + separator.length + 2;
  const taskStr = taskInput.substring(0, taskEndIndex);
  const dateStr = taskInput.substring(dateStartIndex);

  const date = parser.fromString(dateStr);
  if (!date) {
    return { task: taskInput };
  }

  const now = new Date();
  if (date < now) {
    date.setFullYear(now.getFullYear());
    if (date < now) {
      date.setFullYear(now.getFullYear() + 1);
    }
  }

  return {
    task: taskStr,
    due: date,
  };
}
