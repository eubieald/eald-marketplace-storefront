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
        <NavigationBlock
          className={cn(
            'gap-6 items-center text-sm font-medium text-gray-700',
            className
          )}
        >
          {headerNavLinks.map((item, index) => (
            <NavigationItem
              key={index}
              href={item.href}
              isActive={
                headerProps?.pathname !== undefined &&
                (headerProps?.pathname === item?.href ||
                  headerProps?.pathname.startsWith(item?.href))
              }
              className="hover:text-blue-600 transition-colors"
            >
              {item.title}
            </NavigationItem>
          ))}

          {/* Auth Buttons */}
          <AuthenticationButtonGroup>
            {!headerProps?.session?.user ? (
              <>
                <AuthenticationButtonGroup.Login>
                  <Link
                    href="/login"
                    className="rounded-full px-4 py-1.5 text-sm border hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </AuthenticationButtonGroup.Login>
                <AuthenticationButtonGroup.Register>
                  <Link
                    href="/register"
                    className="rounded-full px-4 py-1.5 text-sm border hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    Register
                  </Link>
                </AuthenticationButtonGroup.Register>
              </>
            ) : (
              <AuthenticationButtonGroup.Dashboard>
                <Link
                  href="/admin"
                  className="rounded-full px-4 py-1.5 text-sm border hover:bg-blue-500 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </AuthenticationButtonGroup.Dashboard>
            )}
          </AuthenticationButtonGroup>
        </NavigationBlock>
      </WrapperDesktopBlock>

      <WrapperMobileBlock className="flex items-center">
        <Button
          variant="ghost"
          className="size-10 rounded-full"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>

        {/* Slide-up style sidebar for mobile */}
        <NavigationSidebar
          items={headerNavLinks}
          open={isSidebarOpen}
          onOpenChangeAction={setIsSidebarOpen}
        />
      </WrapperMobileBlock>
    </>
  );
};
