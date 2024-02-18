import type { ElectronAPI } from '@electron-toolkit/preload';
import type {clipboard} from 'electron';

declare global {
  interface Window {
    electron: ElectronAPI
    clipboard: typeof clipboard
  }
}
