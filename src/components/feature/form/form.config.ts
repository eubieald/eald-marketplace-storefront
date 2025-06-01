import { UseFormProps } from "react-hook-form";

export const formConfig: Partial<UseFormProps> = {
  mode: "onSubmit",
  reValidateMode: "onChange",
};
