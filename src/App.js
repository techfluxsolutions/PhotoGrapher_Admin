// import AppRoutes from "./Routes/appRoutes";




// function App() {
//   return <AppRoutes />;
// }


// export default App;


import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={2000} />
    <AppRoutes/>
    </BrowserRouter>
  );
}

export default App;
