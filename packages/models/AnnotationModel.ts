export type TAnnotation = {
  id: number;
  name: string;
  content: string;
  categories: {id: number}[];
}
export type TCreateAnnotationParams = Omit<TAnnotation, 'id'>;