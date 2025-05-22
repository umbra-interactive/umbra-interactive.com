import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { AppProps } from "next/app";

import theme from "../theme";
import "./index.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>Umbra Interactive</title>
    </Head>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </>
  );
}

export default MyApp;
