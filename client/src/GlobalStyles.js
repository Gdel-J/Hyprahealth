import { createGlobalStyle } from 'styled-components';

const sizes = {
  mobile: '600px',
  tablet: '900px',
  desktop: '1200px'
}

const GlobalStyles = createGlobalStyle`
  :root {
    /* Add any root level styles or CSS variables here */
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f0f0f0;
  }

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  /* Mobile Styles */
  @media (max-width: ${sizes.mobile}) {
    body {
      /* Add mobile-specific styles here */
    }
  }

  /* Tablet Styles */
  @media (min-width: ${sizes.mobile}) and (max-width: ${sizes.tablet}) {
    body {
      /* Add tablet-specific styles here */
    }
  }

  /* Desktop Styles */
  @media (min-width: ${sizes.desktop}) {
    body {
      /* Add desktop-specific styles here */
    }
  }
`;

export default GlobalStyles;
