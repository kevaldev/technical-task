import { ThemeProvider } from "@mui/material";
import { Forms } from "./pages";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Forms />
    </ThemeProvider>
  );
}

export default App;
