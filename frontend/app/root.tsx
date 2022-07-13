import { MetaFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { MoralisProvider } from "react-moralis";
import { useLoaderData } from "@remix-run/react";
import styles from './tailwind.css';

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = () => {
  return {
    MORALIS_SERVER_URL: process.env.MORALIS_SERVER_URL,
    MORALIS_APP_ID: process.env.MORALIS_APP_ID,
  }
}



export default function App() {

  const loaderData = useLoaderData();

  return (
    <MoralisProvider serverUrl={`${loaderData.MORALIS_SERVER_URL}`} appId={`${loaderData.MORALIS_APP_ID}`}>
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MoralisProvider>
  );
}
