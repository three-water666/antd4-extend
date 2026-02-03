import React from 'react';
import type { FloatButtonShape, FloatButtonType } from './interface';

export interface FloatButtonContextProps {
  shape?: FloatButtonShape;
  type?: FloatButtonType;
}

const FloatButtonContext = React.createContext<FloatButtonContextProps>({});

export default FloatButtonContext;
