const transitions = {
   opacity: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.6 },
   },
   fromLeft: {
      initial: { opacity: 0, x: '-150%' },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: '-150%' },
      transition: { duration: 0.5 },
   },
   fromRight: {
      initial: { opacity: 0, x: '150%' },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: '150%' },
      transition: { duration: 0.5 },
   },
};

export default transitions;
