import { lazy } from 'react';

export const Home = lazy(() => import('./pages/Home'))

export const Article = lazy(() => import('./pages/Article'))

export const Create = lazy(() => import('./pages/Create'))