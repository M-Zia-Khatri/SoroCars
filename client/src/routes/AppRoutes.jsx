// routes/AppRoutes.js
import { AppNavigation } from "@/constants/navigationConstants";
import Home from "@/pages/AppPages/Home";
import AuthenticatedAppRoot from "@/pages/AppPages/Layout/AuthenticatedAppRoot";
import AuctionTransaction from "@/pages/AppPages/ViewAuctionPages/AuctionTransaction";
import ViewAuction from "@/pages/AppPages/ViewAuctionPages/ViewAuction";
import StockInvoice from "@/pages/AppPages/ViewStockPages/StockInvoice";
import ViewStock from "@/pages/AppPages/ViewStockPages/ViewStock";
import { Navigate } from "react-router-dom";

const AppRoutes = [
  {
    path: "/",
    element: <AuthenticatedAppRoot />,
    children: [
      { index: true, element: <Home /> },
      { path: AppNavigation.ViewStock, element: <ViewStock /> },
      {
        path: AppNavigation.ViewAuction, // "/view-auction"
        element: <ViewAuction />,
      },
      {
        path: AppNavigation.TransactionRelative, // <-- Relative path
        element: <AuctionTransaction />,
      },
      {
        path: AppNavigation.STOCK_INVOICE, // <-- Relative path
        element: <StockInvoice />,
      },
    ],
  },
  { path: "*", element: <Navigate to={AppNavigation.Home} /> },
];

export default AppRoutes;
