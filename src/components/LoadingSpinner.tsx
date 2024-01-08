/**
 * React loading spinner component which displays a loading animation
 * @returns React element
 */
const LoadingSpinner = (): React.JSX.Element => {
  return (
    <div className="flex space-x-2 justify-center items-center bg-black h-full">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-primary rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingSpinner;
