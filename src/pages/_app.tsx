import type { AppProps } from "next/app";
import { AppProvider } from "@/contexts";
import Head from "next/head";
import Layout from "@/components/layout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Teste Front-End - BNP</title>
      </Head>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  );
}
