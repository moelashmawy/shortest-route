import { Control, Controller } from "react-hook-form";
import Select, { SingleValue } from "react-select";

export type CityOption = { label: string; value: string };

type Props = {
  name: string;
  isValid: boolean;
  loading: boolean;
  options: CityOption[];
  placeholder: string;
  control: Control<any, any>;
  requiredMsg: string;
  onInputChange: (input: string) => void;
  onSelect: (input: SingleValue<CityOption>) => void;
  onFocus: () => void;
};

const styles = ({ isValid }: { isValid: boolean }) => ({
  menu: (provided: any, state: any) => ({
    ...provided,
    width: "300px",
    borderBottom: "1px dotted pink",
    color: state.selectProps.menuColor
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "white" : "blue",
    padding: 20
  }),
  control: (provided: any) => ({
    ...provided,
    width: 250,
    "margin-top": 5,
    "border-width": isValid && "2px",
    borderColor: isValid && "red"
  })
});

export const Combobox = ({
  name,
  isValid,
  loading,
  options,
  control,
  requiredMsg,
  placeholder,
  onSelect,
  onInputChange,
  onFocus
}: Props) => {
  return (
    <Controller
      rules={{ required: requiredMsg }}
      name={name}
      control={control}
      render={({ field }) => {
        const { onChange, value } = field;

        return (
          <Select
            {...field}
            onFocus={onFocus}
            defaultValue={{
              label: value?.value ?? "",
              value: value?.value ?? ""
            }}
            value={value}
            isLoading={loading}
            options={options}
            onChange={(input) => {
              onSelect(input);
              onChange(input);
            }}
            onInputChange={onInputChange}
            placeholder={placeholder}
            styles={styles({ isValid })}
          />
        );
      }}
    />
  );
};
