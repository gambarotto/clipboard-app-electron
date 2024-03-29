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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function clearDatabase() {
  await prisma.annotation.deleteMany();
  await prisma.category.deleteMany();
}

async function registerListeners() {
  await categoryMainServices.createCategory();
  await categoryMainServices.updateCategory();
  await categoryMainServices.deleteCategory();
  await categoryMainServices.getCategories();
  await categoryMainServices.getCategory();

  await annotationMainServices.createCategory();
  await annotationMainServices.updateCategory();
  await annotationMainServices.deleteCategory();
  await annotationMainServices.getCategories();
  await annotationMainServices.getCategory();
}

/**
 * Create the application window when the background process is ready.
 */
app
  .whenReady()
  .then(restoreOrCreateWindow)
  .catch(e => console.error('Failed create window:', e));

app.on('ready', async () => {
  // await clearDatabase();
  await registerListeners();
});

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
