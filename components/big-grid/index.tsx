import React, { ReactNode } from 'react'

const BigGrid: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="row my-md-3 ps-md-3 w-100">{children}</div>
}

export default BigGrid
