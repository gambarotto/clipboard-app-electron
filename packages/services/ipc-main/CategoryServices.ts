import { ipcMain } from 'electron';
import type { TCategoryRepository } from '../../repositories/CategoryRepositories.js';

export class CategoryServices {
  private categoryRepository: TCategoryRepository;
  constructor(categoryRepository: TCategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async createCategory() {
    ipcMain.on('create-category', async (event, category) => {
      const newCategory = await this.categoryRepository.createCategory(category);
      event.reply('category-created', newCategory);
    });
  }
  async updateCategory() {
    ipcMain.on('update-category', async (event, category) => {
      const updatedCategory = await this.categoryRepository.updateCategory(category);
      event.reply('category-updated', updatedCategory);
    });
  }
  async deleteCategory() {
    ipcMain.on('delete-category', async (event, category) => {
      await this.categoryRepository.deleteCategory(category);
      event.reply('category-deleted');
    });
  }
  async getCategories() {
    ipcMain.on('get-categories', async (event) => {
      const categories = await this.categoryRepository.getCategories();
      event.reply('categories', categories);
    });
  }
  async getCategory() {
    ipcMain.on('get-category', async (event, id) => {
      const category = await this.categoryRepository.getCategoryById(id);
      event.reply('category', category);
    });
  }
}