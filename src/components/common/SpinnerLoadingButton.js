const SpinnerLoadingButton = () => {
  return (
    <span
      className="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
      style={ { marginRight: '5px' } }
    />
  );
};

export default SpinnerLoadingButton;