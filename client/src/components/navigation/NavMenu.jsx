import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { AppNavigation } from "@/constants/navigationConstants";
import MenuSection from "./MenuSection";
import { auctionMenuItems, stockMenuItems } from "./navMenuItems";

export default function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
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
        <MenuSection label="Stock" items={stockMenuItems} viewStockCard />
        <MenuSection label="Auction" items={auctionMenuItems} />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
