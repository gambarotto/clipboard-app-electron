import {app} from 'electron';
import './security-restrictions';
import {restoreOrCreateWindow} from '/@/mainWindow';
import {platform} from 'node:process';
import updater from 'electron-updater';
import { PrismaClient } from '@prisma/client';
import { CategoryRepository } from '../../repositories/CategoryRepositories';
import { AnnotationRepositories } from '../../repositories/AnnotationRepositories';
import { CategoryMainServices } from '../../services/ipc-main/Category-main-services';
import { AnnotationMainServices } from '../../services/ipc-main/Annotation-main-services';

/**
 * Prevent electron from running multiple instances.
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on('second-instance', restoreOrCreateWindow);

/**
 * Disable Hardware Acceleration to save more system resources.
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

/**
 * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
 */
app.on('activate', restoreOrCreateWindow);

const prisma = new PrismaClient();

const categoryRepository = new CategoryRepository(prisma);
const categoryMainServices = new CategoryMainServices(categoryRepository);

const annotationRepositories = new AnnotationRepositories(prisma);
const annotationMainServices = new AnnotationMainServices(annotationRepositories);

async function registerListeners() {
  categoryMainServices.createCategory();
  categoryMainServices.updateCategory();
  categoryMainServices.deleteCategory();
  categoryMainServices.getCategories();
  categoryMainServices.getCategory();

  annotationMainServices.createCategory();
  annotationMainServices.updateCategory();
  annotationMainServices.deleteCategory();
  annotationMainServices.getCategories();
  annotationMainServices.getCategory();
}

/**
 * Create the application window when the background process is ready.
 */
app
  .whenReady()
  .then(restoreOrCreateWindow)
  .then(registerListeners)
  .catch(e => console.error('Failed create window:', e));

/**
 * Install Vue.js or any other extension in development mode only.
 * Note: You must install `electron-devtools-installer` manually
 */
// if (import.meta.env.DEV) {
//   app
//     .whenReady()
//     .then(() => import('electron-devtools-installer'))
//     .then(module => {
//       const {default: installExtension, VUEJS3_DEVTOOLS} =
//         // @ts-expect-error Hotfix for https://github.com/cawa-93/vite-electron-builder/issues/915
//         typeof module.default === 'function' ? module : (module.default as typeof module);
//
//       return installExtension(VUEJS3_DEVTOOLS, {
//         loadExtensionOptions: {
//           allowFileAccess: true,
//         },
//       });
//     })
//     .catch(e => console.error('Failed install extension:', e));
// }

/**
 * Check for app updates, install it in background and notify user that new version was installed.
 * No reason run this in non-production build.
 * @see https://www.electron.build/auto-update.html#quick-setup-guide
 *
 * Note: It may throw "ENOENT: no such file app-update.yml"
 * if you compile production app without publishing it to distribution server.
 * Like `npm run compile` does. It's ok 😅
 */
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => updater.autoUpdater.checkForUpdatesAndNotify())
    .catch(e => console.error('Failed check and install updates:', e));
}
