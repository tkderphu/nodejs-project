export {};

declare global {
  interface Window {
    bootstrap: {
      Modal: {
        new (element: HTMLElement, options?: any): BootstrapModal;
        getInstance(element: HTMLElement): BootstrapModal | null;
      };
    };
  }

  interface BootstrapModal {
    show(): void;
    hide(): void;
    toggle(): void;
    handleUpdate?(): void;
    dispose?(): void;
  }
}
