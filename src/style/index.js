import styled from 'styled-components';

export const colors = {
   purple: '#C33FC6',
   red: '#FF0000',
   green: '#14DFAE',
   gray: '#757575',
   lightGray: '#EDEDED',
   white: '#FFFFFF',
   black: '#353535',
   yellow: '#D3D63F',
};

export const fonts = {
   nova: "'Nova Round', cursive",
   lato: "'Lato', sans-serif",
};

export const GlobalStyle = styled.div`
   height: 100vh;
   background-color: ${colors.lightGray};
   font-family: ${fonts.lato};

   .container {
      padding: 2rem 5rem 0;
      width: 100vw;
      margin: 0 auto;
   }

   .box {
      background: ${colors.white};
      border: 3px solid rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      padding: 1.5rem 2rem;
   }
`;
