export default () => {
  const loading = () => useState("loader", () => false);

  const startLoading = () => {
    const loader = loading();
    loader.value = true;
    // document.body.style.overflowY = "hidden";
  };

  const stopLoading = () => {
    const loader = loading();
    loader.value = false;
    // document.body.style.overflowY = "scroll";
  };

  return {
    loading,
    startLoading,
    stopLoading,
  };
};
