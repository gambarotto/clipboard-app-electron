/**
 * @module preload
 */

import { contextBridge, ipcRenderer } from 'electron';
import {sha256sum} from './nodeCrypto';
import {versions} from './versions';
export {sha256sum, versions};

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);