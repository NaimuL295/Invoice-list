
import { createBrowserRouter } from "react-router";
import Layout from "../Root/Layout";
import Create_Invoice from "../Components/Page/Create_Invoice/Create_Invoice";
import Add_Item from "../Components/Page/Add_Item/Add_Item";
import Edit_Item_Page from "../Components/Share/Edit_Item_Page";



export const router = createBrowserRouter([
  {
    path: "/",
   Component:Layout,
   children:[
    {path:"/",Component:Create_Invoice},
      {path:"add_Item",Component:Add_Item},
      {path:"/edit/:id",Component:Edit_Item_Page}
   ]
  },
]);

