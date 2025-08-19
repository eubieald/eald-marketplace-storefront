export type NavigationSidebarProps = {
  items: NavigationSidebarItem[];
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
};

export type NavigationSidebarItem = {
  title: string;
  href: string;
  icon?: React.ReactNode;
};
