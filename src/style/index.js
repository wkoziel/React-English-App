import styled from 'styled-components';

export const colors = {
   purple: '#C33FC6',
   red: '#FF0000',
   green: '#14DFAE',
   gray: '#757575',
   lightGray: '#EDEDED',
   darkGray: '#4D4D4D',
   white: '#FFFFFF',
   black: '#353535',
   yellow: '#D3D63F',
};

export const fonts = {
   nova: "'Nova Round', cursive",
   lato: "'Lato', sans-serif",
};

export const GlobalStyle = styled.body`
   background-color: ${colors.lightGray};
   font-family: ${fonts.lato};
   color: ${colors.black};
   height: 100vh;

   ul {
      text-decoration: none;
   }

   a:link,
   a:visited {
      text-decoration: none;
      color: inherit;
   }

   .container {
      padding: 2rem 0;
      width: 100vw;
      margin: 0 auto;
      width: 90vw;
   }

   .box {
      background: ${colors.white};
      border: 3px solid rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      padding: 0.5rem 1rem;
   }
`;
