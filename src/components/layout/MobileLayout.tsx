import { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

const MobileLayout = ({ children, className = "", noPadding = false }: MobileLayoutProps) => {
  return (
    <div className={`min-h-screen bg-background ${noPadding ? "" : "px-5 pt-6"} pb-20 ${className}`}>
      {children}
    </div>
  );
};

export default MobileLayout;
