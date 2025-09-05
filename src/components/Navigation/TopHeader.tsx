"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useMobile } from "@/hooks/use-mobile";

interface TopHeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export function TopHeader({ onMenuClick, sidebarOpen }: TopHeaderProps) {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMobile();

  const notifications = [
    { id: 1, title: "New invoice created", time: "2 min ago", type: "info" },
    { id: 2, title: "Payment received", time: "15 min ago", type: "success" },
    { id: 3, title: "Low inventory alert", time: "1 hour ago", type: "warning" },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className={`flex items-center justify-between h-16 px-4 transition-all duration-300 ${
        !isMobile && sidebarOpen ? 'ml-64' : !isMobile ? 'ml-16' : 'ml-0'
      }`}>
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-gray-600 dark:bg-gray-300 transition-all"></div>
              <div className="w-full h-0.5 bg-gray-600 dark:bg-gray-300 transition-all"></div>
              <div className="w-full h-0.5 bg-gray-600 dark:bg-gray-300 transition-all"></div>
            </div>
          </Button>

          {/* Search Bar - Hidden on mobile */}
          {!isMobile && (
            <div className="relative">
              <Input
                type="search"
                placeholder="Search customers, orders, reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-4 pr-4 py-2 text-sm"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Mobile Search Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              aria-label="Search"
            >
              🔍
            </Button>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2"
                aria-label="Notifications"
              >
                🔔
                <Badge 
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                >
                  {notifications.length}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="font-semibold">
                Notifications
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium text-sm">
                      {notification.title}
                    </span>
                    <Badge 
                      variant={
                        notification.type === 'success' ? 'default' :
                        notification.type === 'warning' ? 'destructive' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {notification.type}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-blue-600 hover:text-blue-700 font-medium">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full p-0"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-blue-600 text-white font-medium">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || 'User Name'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || 'user@company.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                👤 Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                ⚙️ Preferences
              </DropdownMenuItem>
              <DropdownMenuItem>
                📊 Dashboard Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400">
                🚪 Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}