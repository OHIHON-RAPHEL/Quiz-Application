export function Button({ children, onClick, disabled, className = "" }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50 ${className}`}
      >
        {children}
      </button>
    );
  }
  