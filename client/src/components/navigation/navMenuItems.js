import { AppNavigation } from "@/constants/navigationConstants";

export const auctionMenuItems = [
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

export const stockMenuItems = [
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
