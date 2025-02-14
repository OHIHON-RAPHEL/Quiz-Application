export function Card({ children, className = "" }) {
    return <div className={` bg-gray-700 text-white shadow p-[3rem_2rem] rounded-[3rem_0] border-[2px_solid_transparent] ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div>{children}</div>;
  }
  