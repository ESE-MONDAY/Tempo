import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";

export const LayoutOutlet: React.FC = () => {
  return (
    <Suspense fallback={<AppFallback />}>
      <Outlet />
    </Suspense>
  );
};

export const AppFallback: React.FC<{ screen?: boolean }> = (props) => {
  return (
    <div
      className={clsx(
        props.screen ? "h-screen w-screen" : "h-full w-full",
        "grid place-content-center place-items-center bg-transparent"
      )}
    >
      This is the fallback page
    </div>
  );
};
