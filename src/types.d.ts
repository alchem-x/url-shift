export interface LightTipOptions {
  content: string
  duration?: number
  type?: 'success' | 'error' | 'warning' | 'info'
  position?: 'top' | 'bottom' | 'center'
  onClose?: () => void
  onShow?: () => void
}

export interface LightTipInstance {
  show(options: LightTipOptions): void
  success(content: string, duration?: number): void
  error(content: string, duration?: number): void
  warning(content: string, duration?: number): void
  info(content: string, duration?: number): void
  close(): void
  closeAll(): void
}

declare global {
  interface Window {
    LightTip: LightTipInstance
  }
}

export {}