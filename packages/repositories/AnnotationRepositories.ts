
import type { Prisma} from '@prisma/client';
import type { PrismaClient } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';
import type { TAnnotation, TCreateAnnotationParams, TUpdateAnnotationParams } from '../models/AnnotationModel';

export type TAnnotationRepositories = {
  getAnnotations: () => Promise<TAnnotation[]>;
  getAnnotationById: (id: number) => Promise<TAnnotation | null>;
  createAnnotation: (annotation: Omit<TAnnotation, 'id'>) => Promise<TAnnotation>;
  updateAnnotation: (annotation: TAnnotation) => Promise<TAnnotation>;
  deleteAnnotation: (annotationId: number) => Promise<void>;
}

export class AnnotationRepositories implements TAnnotationRepositories{
  private prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  
  constructor(prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
    this.prisma = prisma;
  }

  async createAnnotation({ name, content, categories }: TCreateAnnotationParams) {
    const newAnnotation = await this.prisma.annotation.create({
      data: {
        name,
        content,
        categories: {
          connect: categories.map((categoryId) => ({id: categoryId.id})),
        },
      },
      include: {
        categories: true,
      },
    });
    return newAnnotation;
  }
  async updateAnnotation(data: TUpdateAnnotationParams) {
    const updatedAnnotation = await this.prisma.annotation.update(
      { where: {
        id: data.id,
      }, 
      data: {
        name: data.name,
        content: data.content,
        categories: {
          set: data.categories.map((categoryId) => ({ id: categoryId.id })),
        },
      }, 
      include: {
        categories: true,
      },
    });
    
    return updatedAnnotation;
  }
  async deleteAnnotation(annotationId: number) {
    await this.prisma.annotation.delete({ where: { id: annotationId }});
  }
  async getAnnotations() {
    const annotations = await this.prisma.annotation.findMany({
      include: {
        categories: true,
      },
});
    return annotations;
  }
  async getAnnotationById(annotationId: number) {
    const annotation = await this.prisma.annotation.findUnique({
      where: {
        id: annotationId,
      },
      include: {
        categories: true,
      },
    });
    return annotation;
  }
}
