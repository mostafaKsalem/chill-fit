function Button({ children, className, onClick, width }) {
  return (
    <button
      onClick={onClick}
      className={`bg-white hover:bg-[#0077b6] hover:text-white font-semibold ${width? width : 'w-28'} border-1 rounded-md hover:cursor-pointer py-1 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
