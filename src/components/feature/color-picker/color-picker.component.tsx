'use client';

import { useField, TextInput } from '@payloadcms/ui';

export const ColorPicker = ({
  field: { label, required = false },
  path,
}: {
  field: { label: string; required?: boolean };
  path: string;
}) => {
  const { value = '', setValue } = useField<string>({ path });

  const safeValue = value || '#000000';

  return (
    <div className="field color-picker">
      <label className="field-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="field-input">
        <input
          type="color"
          value={safeValue}
          onChange={(e) => setValue(e.target.value)}
        />
        <TextInput
          label=""
          path={path}
          onChange={(e: { target: { value: string } }) =>
            setValue(e.target.value)
          }
          value={safeValue}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
