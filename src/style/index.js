import { createGlobalStyle } from 'styled-components';

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

export const GlobalStyle = createGlobalStyle`
   body{
      background-color: ${colors.lightGray};
      font-family: ${fonts.lato};
      color: ${colors.black};
      transition: all 0.2s;
   }

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
      margin: 0 auto;
      width: 90vw;
   }

   .box {
      background: ${colors.white};
      border: 3px solid rgba(0, 0, 0, 0.05);
      border-radius: 28px;
      padding: 0.5rem 1rem;
   }

   .page{
      height: 100vh !important;
   }

   .white-box{
      padding: 1rem 2rem;
      background-color: ${colors.white};
      border-radius: 20px;
   }

   /* UTILITY */
   .flex-center{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
   }

   /* TYPOGRAPHY */
   .text-1{
      font-size: 1rem;
   }

   .text-15{
      font-size: 1.5rem;
   }
   
   .text-2{
      font-size: 2rem;
   }

   .text-3{
      font-size: 3rem;
   }

   .text-4{
      font-size: 4rem;
   }

   .text-5{
      font-size: 5rem;
   }

   h1:first-letter{
      text-transform: capitalize;
   }

`;
