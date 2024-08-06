import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import store from "./store/index";

import "./index.css";
import "./styles/theme.scss";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  </Provider>

  // <React.StrictMode>
  //   <body className="bg-light">
  //     <App />
  //   </body>
  // </React.StrictMode>
);
