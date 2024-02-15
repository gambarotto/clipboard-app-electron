import type { TCategory } from './CategoryModel';

export type TAnnotation = {
  id: number;
  name: string;
  content: string;
  categories: TCategory[];
}
export type TCreateAnnotationParams = Omit<TAnnotation, 'id' | 'categories'> & {
  categories: TAnnotationCategoryParams[];
};
export type TUpdateAnnotationParams = Omit<TAnnotation, 'categories'> & {
  categories: TAnnotationCategoryParams[];
};
export type TAnnotationCategoryParams = { id: number }