import "./theme/tailwind.css";

/* TailwindCSS */
import {
  ThemeDetection,
  ThemeDetectionResponse,
} from "@ionic-native/theme-detection";
import { persistor, store } from "./state/store";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const App: React.FC = () => {
  let [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  let [res, setRes] = useState<ThemeDetectionResponse>();

  useEffect(() => {
    ThemeDetection.isAvailable()
      .then((response: ThemeDetectionResponse) => {
        if (response.value) {
          ThemeDetection.isDarkModeEnabled()
            .then((response: ThemeDetectionResponse) => {
              setRes(response);
              setIsDarkModeEnabled(response.value);
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <div className={`${isDarkModeEnabled && "dark"}`}>
          <Home />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
