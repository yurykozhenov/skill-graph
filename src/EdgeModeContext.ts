import React from 'react';

export type EdgeMode =
  | 'line'
  | 'curve1'
  | 'curve2'
  | 'bezier1'
  | 'bezier2'
  | 'bezier3';

const EdgeModeContext = React.createContext<EdgeMode>('line');

export default EdgeModeContext;
