export type NavigationSidebarProps = {
  items: NavigationSidebarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type NavigationSidebarItem = {
  title: string;
  href: string;
  icon?: React.ReactNode;
};
