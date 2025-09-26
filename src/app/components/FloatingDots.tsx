const FloatingDots = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Green Dot */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-dots-green rounded-full animate-float opacity-80"></div>

      {/* Blue Dot */}
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-dots-blue rounded-full animate-float-delayed opacity-70"></div>

      {/* Pink Dot */}
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-dots-pink rounded-full animate-float-slow opacity-90"></div>

      {/* Purple Dot */}
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-dots-purple rounded-full animate-float opacity-75"></div>

      {/* Additional floating dots for more dynamic feel */}
      <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-dots-blue rounded-full animate-float-delayed opacity-60"></div>
      <div className="absolute top-2/3 right-1/6 w-2 h-2 bg-dots-green rounded-full animate-float-slow opacity-50"></div>
      <div className="absolute top-1/6 right-1/2 w-1 h-1 bg-dots-pink rounded-full animate-float opacity-80"></div>
    </div>
  );
};

export default FloatingDots;
