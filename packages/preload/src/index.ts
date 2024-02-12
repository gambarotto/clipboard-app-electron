/**
 * @module preload
 */

import { contextBridge } from 'electron';
import {sha256sum} from './nodeCrypto';
import {versions} from './versions';
export {sha256sum, versions};
import { electronAPI } from '@electron-toolkit/preload';

contextBridge.exposeInMainWorld('electron', electronAPI);