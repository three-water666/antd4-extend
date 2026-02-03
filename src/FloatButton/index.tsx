import FloatButton from './FloatButton';
import FloatButtonGroup from './FloatButtonGroup';
import BackTop from './BackTop';

type CompoundedComponent = typeof FloatButton & {
  Group: typeof FloatButtonGroup;
  BackTop: typeof BackTop;
};

const CompoundedFloatButton = FloatButton as CompoundedComponent;

CompoundedFloatButton.Group = FloatButtonGroup;
CompoundedFloatButton.BackTop = BackTop;

export default CompoundedFloatButton;
export type { FloatButtonProps, FloatButtonGroupProps, BackTopProps } from './interface';
