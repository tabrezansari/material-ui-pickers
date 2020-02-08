import * as React from 'react';
import * as PropTypes from 'prop-types';
import KeyboardDateInput from '../_shared/KeyboardDateInput';
import Popover, { PopoverProps } from '@material-ui/core/Popover';
import { WrapperProps } from './Wrapper';
import { InnerMobileWrapperProps } from './MobileWrapper';
import { WrapperVariantContext } from './WrapperVariantContext';
import { useKeyDownHandler, keycode } from '../_shared/hooks/useKeyDown';

export interface InnerDesktopWrapperProps {
  /** Popover props passed to material-ui Popover */
  PopoverProps?: Partial<PopoverProps>;
}

export interface DesktopWrapperProps
  extends InnerDesktopWrapperProps,
    WrapperProps,
    Partial<InnerMobileWrapperProps> {}

export const DesktopWrapper: React.FC<DesktopWrapperProps> = ({
  open,
  wider,
  children,
  PopoverProps,
  onClear,
  onDismiss,
  onSetToday,
  onAccept,
  showTabs,
  DateInputProps,
  okLabel,
  cancelLabel,
  clearLabel,
  todayLabel,
  showTodayButton,
  clearable,
  DialogProps,
  ...other
}) => {
  const ref = React.useRef();
  const handleKeydown = useKeyDownHandler(open, {
    [keycode.Enter]: onAccept, // Enter
  });

  return (
    <WrapperVariantContext.Provider value="desktop">
      <KeyboardDateInput {...other} {...DateInputProps} inputRef={ref} />

      <Popover
        role="dialog"
        open={open}
        onClose={onDismiss}
        anchorEl={ref.current}
        onEscapeKeyDown={handleKeydown}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        {...PopoverProps}
      >
        {children}
      </Popover>
    </WrapperVariantContext.Provider>
  );
};

DesktopWrapper.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  PopoverProps: PropTypes.object,
} as any;
