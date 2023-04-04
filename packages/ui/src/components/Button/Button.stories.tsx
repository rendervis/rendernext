import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from '.';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,

  argTypes: {
    kind: {
      options: [
        'primary',
        'secondary',
        'ghost',
        'danger',
      ],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' },
    },
    children: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;
export const Default = (args: ButtonProps) => {
  return <Button kind='primary' {...args}>Default</Button>;
};
export const Secondary = (args: ButtonProps) => {
  return <Button kind='secondary' {...args}>Secondary</Button>;
};

export const Ghost = (args: ButtonProps) => {
  return (
    <Button kind="ghost" {...args}>
      Ghost
    </Button>
  );
};

export const Danger = (args:ButtonProps) => {
  return (
    <>
      <Button kind="danger" {...args}>
      Danger
      </Button>
    </>
  );
};
