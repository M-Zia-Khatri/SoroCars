import React from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import ListItem from "./ListItem";
import { AppNavigation } from "@/constants/navigationConstants";

export default function MenuSection({ label, items, viewStockCard = false }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul
          className={`
            grid gap-3 p-4
            ${
              viewStockCard
                ? "md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
                : "w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]"
            }
          `}
        >
          {viewStockCard && (
            <li className="row-span-3">
              <NavigationMenuLink asChild>
                <a
                  href={AppNavigation.ViewStock}
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                >
                  <div className="mb-2 mt-4 text-lg font-medium">
                    View Stock
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    View and manage available stock details.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
          )}
          {items.map((item) => (
            <ListItem key={item.title} {...item} />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
