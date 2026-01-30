const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div className="spinner"></div>
      <p className="text-[var(--color-text-secondary)]">{message}</p>
    </div>
  );
};

export default Loading;
