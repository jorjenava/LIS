import type { Metadata } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import theme from "./theme";
import NextLink from 'next/link'

export const metadata: Metadata = {
  title: "LIS Form",
  description: "A solution to an interview problem",
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="xl">
              <AppBar position="static">
                <Toolbar>
                  <Typography
                    variant="h6"
                    component={NextLink}
                    sx={{ flexGrow: 1, textDecoration: "none" }}
                    href="/"
                    color="#FFF"
                  >
                    LIS Interview Solution
                  </Typography>
                </Toolbar>
              </AppBar>
              {children}
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
