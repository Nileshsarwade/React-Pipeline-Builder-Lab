import React from "react";
import '../styles/Base-node.css';

const BaseNode = ({ title, children, className, selected, icon, ...props }) => {
  return (
    <div className={`base-node glow-node ${selected ? 'selected' : ''}`} {...props}>
      {icon && (
        <div className="base-node-icon">
          {icon}
        </div>
      )}
      <div className="base-node-title">
        {title}
      </div>
      <div className="base-node-body">
        {children}
      </div>
    </div>
  );
};

export default BaseNode;
