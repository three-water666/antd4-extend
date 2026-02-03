import * as React from 'react';
import type { SplitterLayout } from './interface';

export interface SplitterContextProps {
  prefixCls: string;
  layout: SplitterLayout;
}

const SplitterContext = React.createContext<SplitterContextProps | null>(null);

export default SplitterContext;
