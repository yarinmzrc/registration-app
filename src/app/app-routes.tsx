import { ProtectedRoute } from "@/features/auth";
import { Account, Home, NotFound, Register } from "@/pages";
import { Routes, Route } from "react-router";
import { AppLayout } from "./app-layout";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}
