import { SheetsRegistry } from 'jss';
import {
  createMuiTheme,
  createGenerateClassName
} from '@material-ui/core/styles';

// Create a theme with Gatsby brand colors. You can choose your own
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: '#FFDE00'
    },
    secondary: {
      main: '#EEEEEE'
    }
  }
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName({
      dangerouslyUseGlobalCSS: true,
      productionPrefix: 'c'
    })
  };
}

declare global {
  interface Window {
    __INIT_MATERIAL_UI__: {};
  }
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!(process as any).browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!window.__INIT_MATERIAL_UI__) {
    window.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return window.__INIT_MATERIAL_UI__;
}
