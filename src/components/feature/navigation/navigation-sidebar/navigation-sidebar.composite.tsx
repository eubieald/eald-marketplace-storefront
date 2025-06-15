'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { ScrollArea } from '@/components/ui/scroll-area';
import { NavigationSidebarProps } from './navigation-sidebar.types';
import { AuthenticationButtonGroup } from '../../authentication/authentication-button-group';
import Link from 'next/link';
import { NavigationBlock, NavigationItem } from '../navigation.component';
import { usePathname } from 'next/navigation';

export const NavigationSidebar = ({
  items,
  open,
  onOpenChange,
}: NavigationSidebarProps) => {
  const pathname = usePathname();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetHeader className="hidden lg:flex">
        {/* NOTE: Added this even not used because it is required by sheet component */}
        <SheetTitle />
      </SheetHeader>
      <SheetContent side="left" className="p-0 transition-none">
        <ScrollArea className="h-full">
          <NavigationBlock className="flex-col gap-2 p-4">
            {items.map((item, index) => (
              <NavigationItem
                key={index}
                href={item.href}
                isActive={
                  pathname === item.href || pathname.startsWith(item.href)
                }
              >
                {item.title}
              </NavigationItem>
            ))}
            <AuthenticationButtonGroup className="flex-col border-t">
              <AuthenticationButtonGroup.Login className=" px-4 w-full">
                <Link href="/login">Login</Link>
              </AuthenticationButtonGroup.Login>
              <AuthenticationButtonGroup.Register className=" px-4 w-full">
                <Link href="/register">Register</Link>
              </AuthenticationButtonGroup.Register>
            </AuthenticationButtonGroup>
          </NavigationBlock>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
