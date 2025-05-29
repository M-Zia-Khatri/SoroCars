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
];

const stockMenuItems = [
  {
    title: "View Stock",
    href: AppNavigation.ViewStock,
    description: "A modal dialog for stock listings and interaction.",
  },
  {
    title: "Stock Invoice",
    href: AppNavigation.STOCK_INVOICE,
    description: "Generates and displays stock invoices.",
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
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
