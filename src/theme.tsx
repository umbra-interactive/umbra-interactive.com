import { extendTheme, StyleFunctionProps, defineStyleConfig } from "@chakra-ui/react";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

// const buttonTheme = defineStyleConfig({
//   baseStyle: {
//     bg: (props: StyleFunctionProps) => ({
//       bg: props.colorMode === 'light' ? '#33323c' : '#f2f2f4',
//     }),
//   },
// });

const theme = extendTheme({
  // useSystemColorMode: false,
    styles: {
      global: {
        body: {
          bg: (props: StyleFunctionProps) => ({
            bg: props.colorMode === 'dark' ? '#1a1a1a' : '#f2f2f4',
          }),
          color: (props: StyleFunctionProps) => ({
            color: props.colorMode === 'dark' ? '#f2f2f4' : '#1a1a1a',
          }),
          border: (props: StyleFunctionProps) => ({
            border: props.colorMode === 'dark' ? '#f2f2f4' : '#1a1a1a',
          }),
        },
      },
    },
  // components: {
  //   Button: buttonTheme,
  // },
  fonts,
  breakpoints,
});

export default theme;
