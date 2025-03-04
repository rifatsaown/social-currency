export interface CustomButtonProps {
    buttonText: string;
    onClick?: () => void;
    className?: string;
  }

export interface ParallaxEvent {
  clientX: number;
  clientY: number;
}

export interface FormField {
  name: string;
  value: string;
}