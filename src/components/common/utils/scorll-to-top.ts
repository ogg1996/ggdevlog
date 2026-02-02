const scrollToTop = (behavior: ScrollBehavior = 'auto', top = 0) => {
  window.scrollTo({ top, behavior });
};

export default scrollToTop;
