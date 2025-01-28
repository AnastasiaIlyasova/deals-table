import {RouterProvider, createBrowserRouter} from "react-router-dom";
import './App.css'
import TableDeals from "./pages/TableDeals";
import DealInfo from "./pages/DealInfo";

const router = createBrowserRouter([
  {
    path: '/',
    element: <TableDeals/>,
  },
  {
    path: '/deal/:id',
    element: <DealInfo/>,
  },
])
function App() {
  return <RouterProvider router={router}/>;
}

export default App;
