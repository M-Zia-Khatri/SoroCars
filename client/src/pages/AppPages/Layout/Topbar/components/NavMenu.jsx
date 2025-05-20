import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AppNavigation } from "@/constants/navigationConstants";

const auctionMenuItems = [
  {
    title: "View Auction",
    href: AppNavigation.ViewAuction,
    description: "A modal dialog for auction listings and interaction.",
  },
  {
    title: "Auction Transaction",
    href: AppNavigation.TransactionRelative,
    description: "Handles auction-based transaction submissions.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Tracks progress using visual indicators.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Scrollable areas for overflow content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "UI tabs for grouping content.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description: "Hints shown on hover or focus.",
  },
];

const stockMenuItems = [
  {
    title: "Introduction",
    href: "/docs",
    description: "Overview of the stock module.",
  },
  {
    title: "Installation",
    href: "/docs/installation",
    description: "How to install and set up stock features.",
  },
  {
    title: "Typography",
    href: "/docs/primitives/typography",
    description: "Style text in your stock-related content.",
  },
];

export default function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Stock Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Stock</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href={AppNavigation.ViewStock}
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">View Stock</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      View and manage available stock details.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {stockMenuItems.map((item) => (
                <ListItem key={item.title} {...item} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Auction Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Auction</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {auctionMenuItems.map((item) => (
                <ListItem key={item.title} {...item} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Add Car Details Link */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              to={AppNavigation.Home}
              className={navigationMenuTriggerStyle()}
            >
              Add Car Details
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, description, href, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
);
ListItem.displayName = "ListItem";
