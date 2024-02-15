
import type { Prisma} from '@prisma/client';
import type { PrismaClient } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';
import type { TCategory } from '../models/CategoryModel';

export type TCategoryRepository = {
  getCategories: () => Promise<TCategory[]>;
  getCategoryById: (id: number) => Promise<TCategory | null>;
  createCategory: (category: Omit<TCategory, 'id'>) => Promise<TCategory>;
  updateCategory: (category: TCategory) => Promise<TCategory>;
  deleteCategory: (categoryId: number) => Promise<void>;
}

export class CategoryRepository implements TCategoryRepository {
  private prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  
  constructor(prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
    this.prisma = prisma;
  }

  async getCategories() {
    const categories = await this.prisma.category.findMany();
    return categories;
  }
  async getCategoryById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    return category;
  }
  async createCategory(category: Omit<TCategory, 'id'>) {
    const alreadyExists = await this.prisma.category.findFirst({where: {
      title: category.title,
    }});
    if (alreadyExists) {
      throw new Error('Category already exists');
    }
    const newCategory = await this.prisma.category.create({
      data: category,
    });
    return newCategory;
  }
  async updateCategory(category: TCategory) {
    const updatedCategory = await this.prisma.category.update({where: {id: category.id}, data: category});
    return updatedCategory;
  }
  async deleteCategory(categoryId: number) {
    await this.prisma.category.delete({ where: { id: categoryId }});
  }
}
