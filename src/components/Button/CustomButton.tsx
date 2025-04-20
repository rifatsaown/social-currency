import { ForwardedRef, forwardRef } from 'react';
import { CustomButtonProps } from '../../Interface';

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    { buttonText, onClick, className = '' },
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 rounded-full text-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 ${className}`}
      >
        {buttonText}
      </button>
    );
  }
);

// Add display name for better debugging
CustomButton.displayName = 'CustomButton';

export default CustomButton;
