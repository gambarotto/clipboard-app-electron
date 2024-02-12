import { ipcMain } from 'electron';
import type { TAnnotationRepositories } from '../../repositories/AnnotationRepositories.js';

export class AnnotationMainServices {
  private annotationRepositories: TAnnotationRepositories;
  constructor(annotationRepositories: TAnnotationRepositories) {
    this.annotationRepositories = annotationRepositories;
  }

  async createCategory() {
    ipcMain.on('create-annotation', async (event, annotation) => {
      const newCategory = await this.annotationRepositories.createAnnotation(annotation);
      event.returnValue = newCategory;
    });
  }
  async updateCategory() {
    ipcMain.on('update-annotation', async (event, annotation) => {
      const updatedCategory = await this.annotationRepositories.updateAnnotation(annotation);
      event.returnValue = updatedCategory;
    });
  }
  async deleteCategory() {
    ipcMain.on('delete-annotation', async (event, annotationId) => {
      await this.annotationRepositories.deleteAnnotation(annotationId);
      event.returnValue = 'category-deleted';
    });
  }
  async getCategories() {
    ipcMain.on('get-annotations', async (event) => {
      const categories = await this.annotationRepositories.getAnnotations();
      event.returnValue = categories;
    });
  }
  async getCategory() {
    ipcMain.on('get-annotation', async (event, id) => {
      const category = await this.annotationRepositories.getAnnotationById(id);
      event.returnValue = category;
    });
  }
}