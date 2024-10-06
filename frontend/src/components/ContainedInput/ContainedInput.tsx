import { TextInput } from "@mantine/core";
import classes from "./ContainedInput.module.css";

interface ContainedInputProps {
  label: string;
  placeholder: string;
}

export function ContainedInput(props: ContainedInputProps) {
  return (
    <>
      <TextInput
        // label="Shipping address"
        // placeholder="15329 Huston 21st"
        classNames={classes}
        {...props}
      />
    </>
  );
}
