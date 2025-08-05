'use client';

import Link from 'next/link';
import { CommonProps } from '@/lib/types';
import { headerNavLinks } from '../header';
import { WrapperDesktopBlock, WrapperMobileBlock } from '../common';
import { Button } from '@/components/ui/button';
import { NavigationSidebar } from './navigation-sidebar';
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import { AuthenticationButtonGroup } from '../authentication/authentication-button-group';
import { NavigationBlock, NavigationItem } from './navigation.component';
import { cn } from '@/lib/utils';
import { AuthResultSessionOutput } from '@/lib/auth/types';

export const Navigation = ({
  className,
  headerProps,
}: CommonProps & {
  headerProps?: {
    session: AuthResultSessionOutput;
    pathname?: string;
  };
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <WrapperDesktopBlock>
        <nav
          className={cn(
            'h-20 flex border-b justify-between font-medium',
            className
          )}
        >
          <NavigationBlock className="gap-4 items-center">
            {headerNavLinks.map((item, index) => (
              <NavigationItem
                key={index}
                href={item.href}
                isActive={
                  headerProps?.pathname !== undefined &&
                  (headerProps?.pathname === item?.href ||
                    headerProps?.pathname.startsWith(item?.href))
                }
              >
                {item.title}
              </NavigationItem>
            ))}
          </NavigationBlock>
          <AuthenticationButtonGroup>
            {!headerProps?.session?.user ? (
              <>
                <AuthenticationButtonGroup.Login className="border-l bg-white border-y-0 px-12 h-full rounded-none hover:bg-cyan-400 transition-colors text-lg">
                  <Link href="/login">Login</Link>
                </AuthenticationButtonGroup.Login>
                <AuthenticationButtonGroup.Register className="border-r border-y-0 px-12 border-l-0 h-full bg-black text-white hover:text-black rounded-none hover:bg-cyan-400 transition-colors text-lg">
                  <Link href="/register">Register</Link>
                </AuthenticationButtonGroup.Register>
              </>
            ) : (
              <AuthenticationButtonGroup.Dashboard className="border-r border-y-0 px-12 border-l-0 h-full bg-black text-white hover:text-black rounded-none hover:bg-cyan-400 transition-colors text-lg">
                <Link href="/dashboard">Dashboard</Link>
              </AuthenticationButtonGroup.Dashboard>
            )}
          </AuthenticationButtonGroup>
        </nav>
      </WrapperDesktopBlock>

      <WrapperMobileBlock className="flex items-center">
        <Button
          variant="ghost"
          className="size-12 border-transparent"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>

        <NavigationSidebar
          items={headerNavLinks}
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
        />
      </WrapperMobileBlock>
    </>
  );
};
