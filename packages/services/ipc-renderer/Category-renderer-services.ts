import type { TCategory, TCreateCategoryParams } from '../../models/CategoryModel';
import type { ElectronAPI } from '@electron-toolkit/preload';

export class CategoryRendererServices {
  private ipcElectron: ElectronAPI[ 'ipcRenderer' ];
  constructor(ipcRenderer: ElectronAPI[ 'ipcRenderer' ]) {
    this.ipcElectron = ipcRenderer;
  }
  async createCategory({ title, active, color }: TCreateCategoryParams): Promise<TCategory> {
    const category = this.ipcElectron.sendSync('create-category', {title, active, color});
    return category;
  }
  async updateCategory({ id, title, active, color }: TCategory): Promise<TCategory | undefined> {
    const category = this.ipcElectron.sendSync('update-category', {id, title, active, color});
    return category;
  }
  async deleteCategory(categoryId: number) {
    this.ipcElectron.sendSync('delete-category', categoryId);
  }
  async getCategories(): Promise<TCategory[]> {
    const categories = this.ipcElectron.sendSync('get-categories');
    return categories;
  }
  async getCategory(categoryId: number): Promise<TCategory | undefined> {
    const category = this.ipcElectron.sendSync('get-category', categoryId);
    return category;
  }
}