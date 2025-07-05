"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTemplatesFromStorage } from "./storeTemplate";
import { selectTemplate, setTemplate } from "@/store/Template/templateSlice";

function InitTemplatesLoader({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const templates = loadTemplatesFromStorage();
    dispatch(setTemplate(templates));
    if (templates.length > 0) {
      dispatch(selectTemplate(templates[0].id));
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default function ClientProvider({ children }) {
  return (
    <Provider store={store}>
      <InitTemplatesLoader>{children}</InitTemplatesLoader>
    </Provider>
  );
}
