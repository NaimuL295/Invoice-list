import { createBrowserRouter } from "react-router";
import Layout from "../Root/Layout";
import Create_Invoice from "../Components/Page/Create_Invoice/Create_Invoice";
import Add_Item from "../Components/Page/Add_Item/Add_Item";
import Edit_Item_Page from "../Components/Share/Edit_Item_Page";

import Login from "../Components/Page/Login/Login";
import Auth from "../Root/Auth";
import Register from "../Components/Page/Register/Register";
import Settings from "../Components/Page/Settings/Settings";
import Profile from "../Components/Page/Settings/Profile";
import PrintSettings from "../Components/Page/Settings/PrintSettings/PrintSettings";
import TransitionDetails from "../Components/Page/Home/TransitionDetails";

//import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: TransitionDetails },
      { path: "create", Component: Create_Invoice },
      { path: "create/add_Item", Component: Add_Item },
      { path: "/edit/:id", Component: Edit_Item_Page },
      { path: "profile", Component: Profile },
      // { path: "/print/:id", element: <PrintPreview /> },
      {
        path: "auth",
        Component: Auth,
        children: [
          { path: "login", Component: Login },
          { path: "register", Component: Register },
        ],
      },
      {
        path: "setting",
        Component: Settings,
        children: [
          {
            path: "printSettings",
            element: (
              // <ProtectedRoute>
              <PrintSettings />
              // </ProtectedRoute>
            ),
          },
        ],
      },
      {path:"/*",}
    ],
  },
]);
