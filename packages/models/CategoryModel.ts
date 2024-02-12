export type TCategory = {
  id: number;
  title: string;
  active: boolean;
  color: string;
}
export type TCreateCategoryParams = Omit<TCategory, 'id'>;