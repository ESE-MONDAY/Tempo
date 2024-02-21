import React from 'react';
import { Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { WeatherRouter } from './Routes';
import { AppFallback } from './Layout';

export interface IModuleRouter {
  routes: RouteObject[];
  layout?: () => JSX.Element;
  key: string;
}


const AppRouter = () => {

const router = WeatherRouter;

  const Layout = router?.layout ?? AppFallback;

  const routerView = useRoutes([
    {
      element: <Layout />,
      children: router?.routes ?? [],
    },
  ]);

  return <Suspense fallback={<AppFallback screen />}>{routerView}</Suspense>;
};

export default AppRouter;
