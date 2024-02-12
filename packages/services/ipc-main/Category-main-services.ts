import { ipcMain } from 'electron';
import type { TCategoryRepository } from '../../repositories/CategoryRepositories.js';

export class CategoryMainServices {
  private categoryRepository: TCategoryRepository;
  constructor(categoryRepository: TCategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async createCategory() {
    ipcMain.on('create-category', async (event, category) => {
      const newCategory = await this.categoryRepository.createCategory(category);
      event.returnValue = newCategory;
    });
  }
  async updateCategory() {
    ipcMain.on('update-category', async (event, category) => {
      const updatedCategory = await this.categoryRepository.updateCategory(category);
      event.returnValue = updatedCategory;
    });
  }
  async deleteCategory() {
    ipcMain.on('delete-category', async (event, categoryId) => {
      await this.categoryRepository.deleteCategory(categoryId);
      event.returnValue = 'category-deleted';
    });
  }
  async getCategories() {
    ipcMain.on('get-categories', async (event) => {
      const categories = await this.categoryRepository.getCategories();
      event.returnValue = categories;
    });
  }
  async getCategory() {
    ipcMain.on('get-category', async (event, id) => {
      const category = await this.categoryRepository.getCategoryById(id);
      event.returnValue = category;
    });
  }
}