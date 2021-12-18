import { createGlobalStyle } from 'styled-components';

export const colors = {
   purple: '#C33FC6',
   red: 'hsla(0, 100%, 50%, 0.7)',
   green: '#14DFAE',
   yellow: '#D3D63F',
   background: '#EDEDED',
   gray1: '#cccccc',
   gray2: '#888888',
   gray3: '#757575',
   gray4: '#4D4D4D',
   white: '#FFFFFF',
   black: '#353535',
};

export const fonts = {
   nova: "'Nova Round', cursive",
   lato: 'Arial, Helvetica, sans-serif',
};

export const GlobalStyle = createGlobalStyle`

   // GLOBAL
   body{
      background-color: ${colors.background};
      font-family: Arial, Helvetica, sans-serif;
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

   //UTILITIS
   .container {
      padding: 1rem 0;
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
      min-height: 90vh;
   }

   .white-box{
      padding: 1rem 2rem;
      background-color: ${colors.white};
      border-radius: 20px;
   }

   .flex-center{
      display: flex;
      margin: auto auto;
   }

   .no-margin{
      margin: 0;
   }

   .circle {
      border-radius: 50%;
      border: 1rem solid ${colors.green};
      height: 12rem;
      width: 12rem;
      display: flex;
      align-items: center;
      justify-content: center;
   }

   //TYPOGRAPHY
   h1, h2, h3, h4,h5 {
      line-height: 1.25;
      margin: 0.75rem;
      &::first-letter{
         text-transform: capitalize;
      }
   }

   h1 {
      font-size: 2.5rem;
   }

   h2 {
      font-size: 2rem;
   }

   h3 {
   font-size: 1.5rem;
   }

   h4 {
   font-size: 1.25rem;
   }

   h5 {
   font-size: 1rem;
   }

   p {
   margin-bottom: 1.25rem;
   }

   @media screen and (min-width: 800px) {
      h1 {
         font-size: 3rem;
      }
      h2 {
         font-size: 2.5rem;
      }
      h3 {
         font-size: 2rem;
      }
      h4 {
         font-size: 1.5rem;
      }
      h5 {
         font-size: 1.25rem;
      }
   }

   .green{
      color: ${colors.green}
   }
   .red{
      color: ${colors.red}
   }
   .yellow{
      color: ${colors.yellow}
   }
   .purple{
      color: ${colors.purple}
   }
   .gray{
      color: ${colors.gray2}
   }
   .black{
      color: ${colors.black}
   }

   //ANIMATIONS
   @keyframes changeSize {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(0.95);
    }
}

.pulse {
    animation-duration: 3s;
    animation-name: changeSize;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

.pulseReversed {
    animation-duration: 3s;
    animation-name: changeSize;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-direction: alternate-reverse;
}
`;
