declare module 'custom-cursor-react' {
    import { Component } from 'react';
  
    interface CustomCursorProps {
      targets?: string[];
      customClass?: string;
      dimensions?: number;
      fill?: string;
      smoothness?: {
        movement?: number;
        scale?: number;
        opacity?: number;
      };
      targetOpacity?: number;
    }
  
    export default class CustomCursor extends Component<CustomCursorProps> {}
  }
  