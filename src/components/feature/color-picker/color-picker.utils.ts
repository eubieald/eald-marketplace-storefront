import type { TextField } from 'payload';

export const COLOR = (overrides?: Omit<TextField, 'type'>): TextField => {
  const { name = 'color', label = 'Color', admin, ...rest } = overrides ?? {};

  return {
    type: 'text',
    name,
    label,
    admin: {
      ...admin,
      components: {
        Field: '@/components/feature/color-picker/color-picker.component',
      },
    },
    ...rest,
  } as TextField;
};
