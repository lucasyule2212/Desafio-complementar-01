import { ReactNode } from "react";
interface ISideBarProps{
  children: ReactNode
}

export function SideBar(props:ISideBarProps) {
  // Complete aqui
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {props.children}
      </div>
    </nav>
  );
}
