import { forwardRef } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { Group, Avatar, Text, Menu, UnstyledButton } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";
interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  email: string;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: "var(--mantine-spacing-md)",
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  )
);

export default function menu() {
  return (
    <Menu withArrow>
      <Menu.Target>
        <UserButton
          image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          name="Harriette Spoonlicker"
          email="Profile & Setting"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Profile</Menu.Label>
        <Menu.Item
          leftSection={
            <IconArrowsLeftRight style={{ width: 14, height: 14 }} />
          }
        >
          Logout
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconTrash style={{ width: 14, height: 14 }} />}
        >
          Delete my account
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Setting</Menu.Label>
        <Menu.Item
          leftSection={<IconSettings style={{ width: 14, height: 14 }} />}
        >
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMessageCircle style={{ width: 14, height: 14 }} />}
        >
          Wishlist
        </Menu.Item>
        <Menu.Item
          leftSection={<IconPhoto style={{ width: 14, height: 14 }} />}
        >
          Reviews
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSearch style={{ width: 14, height: 14 }} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          my order
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
