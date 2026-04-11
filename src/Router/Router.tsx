import { createBrowserRouter } from "react-router";
import Layout from "../Root/Layout";
import Create_Invoice from "../Components/Page/Create_Invoice/Create_Invoice";
import Add_Item from "../Components/Page/Add_Item/Add_Item";
import Edit_Item_Page from "../Components/Share/Edit_Item_Page";

import Login from "../Components/Page/Login/Login";
import Auth from "../Root/Auth";
import Register from "../Components/Page/Register/Register";
import Profile from "../Components/Page/Settings/Profile";
import PrintSettings from "../Components/Page/Settings/PrintSettings/PrintSettings";
import TransitionDetails from "../Components/Page/Home/TransitionDetails";
import Modify_Invoice from "../Components/Page/Modify_Invoices/Modify_Invoice";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Add_Item_Page from "../Components/Page/Add_Item/Add_Item";
import ErrorPage from "../Components/Page/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true,    element: (
          <ProtectedRoute>
           <TransitionDetails></TransitionDetails>
          </ProtectedRoute>
        ), },
      {
        path: "create",
        element: (
          <ProtectedRoute>
            <Create_Invoice></Create_Invoice>
          </ProtectedRoute>
        ),
      },
      { path: "create/add_Item", Component: Add_Item_Page },
      { path: "edit/:id", Component: Edit_Item_Page },
      { path: "modify/:id", element:<ProtectedRoute><Modify_Invoice></Modify_Invoice></ProtectedRoute>  },
      { path: "modify/:id/add_item", Component: Add_Item },
      { path: "profile", element:<ProtectedRoute> <Profile></Profile> </ProtectedRoute>},
      { path: "printSettings", Component: PrintSettings },
      {
        path: "auth",
        Component: Auth,
        children: [
          { path: "login", element: <Login></Login> },
          { path: "register", element: <Register></Register> },
        ],
      },

      { path: "*", Component: ErrorPage },
    ],
  },
]);
