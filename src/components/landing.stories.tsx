import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Landing } from "./landing"

const meta: Meta<typeof Landing> = {
  title: "Components/Landing",
  component: Landing,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
