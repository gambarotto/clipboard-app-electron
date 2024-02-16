import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { TCategory, TCreateCategoryParams } from '../../../models/CategoryModel';
import type { TAnnotation, TCreateAnnotationParams, TUpdateAnnotationParams } from '../../../models/AnnotationModel';
import { CategoryRendererServices } from '../../../services/ipc-renderer/Category-renderer-services';
import { AnnotationRendererServices } from '../../../services/ipc-renderer/Annotation-renderer-services';

type TInitialState = {
  categories: TCategory[];
  annotations: TAnnotation[];
  createCategory: (category: TCreateCategoryParams) => Promise<TCategory | null | undefined>;
  updateCategory: (category: TCategory) => Promise<TCategory | null | undefined>;
  deleteCategory: (categoryId: number) => Promise<void>;
  getCategories: () => Promise<void>;
  createAnnotation: (
    annotation: TCreateAnnotationParams,
  ) => Promise<TAnnotation | null | undefined>;
  updateAnnotation: (
    annotation: TUpdateAnnotationParams,
  ) => Promise<TAnnotation | null | undefined>;
  deleteAnnotation: (annotationId: number) => Promise<void>;
  getAnnotations: () => Promise<void>;
};

const UserContext = createContext<TInitialState>({} as TInitialState);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [annotations, setAnnotations] = useState<TAnnotation[]>([]);
  
  const categoryRendererServices = new CategoryRendererServices(window.electron.ipcRenderer);
  const annotationRendererServices = new AnnotationRendererServices(window.electron.ipcRenderer);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getAnnotations();
  }, []);

  // Categories
  const createCategory = useCallback(
    async (category: TCreateCategoryParams) => {
      try {
        const newCategory = await categoryRendererServices.createCategory(category);
        if (!newCategory) return null;
        setCategories([...categories, newCategory]);
        return newCategory;
      } catch (error) {
        console.log('error', error);
      }
    },
    [categoryRendererServices.createCategory],
  );
  const updateCategory = useCallback(
    async (category: TCategory) => {
      try {
        const updatedCategory = await categoryRendererServices.updateCategory(category);
        if (!updatedCategory) return null;

        setCategories([...categories, updatedCategory]);
        return updatedCategory;
      } catch (error) {
        console.log('ctx.updateCategory', error);
      }
    },
    [categoryRendererServices.updateCategory],
  );
  const deleteCategory = useCallback(
    async(categoryId: number) => {
      try {
        await categoryRendererServices.deleteCategory(categoryId);
      } catch (error) {
        console.log('ctx.deleteCategory', error);
      }
    },
    [categoryRendererServices.deleteCategory],
  );
  const getCategories = useCallback(async () => {
    try {
      const categoriesData = await categoryRendererServices.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.log('error', error);
    }
  }, [categoryRendererServices.getCategories]);

  // Annotations
  const createAnnotation = useCallback(
    async (annotation: TCreateAnnotationParams) => {
      try {
        const newAnnotation = await annotationRendererServices.createAnnotation(annotation);
        if (!newAnnotation) return null;
        setAnnotations([...annotations, newAnnotation]);
        return newAnnotation;
      } catch (error) {
        console.log('error', error);
      }
    },
    [annotationRendererServices.createAnnotation],
  );
  const updateAnnotation = useCallback(
    async (annotation: TUpdateAnnotationParams) => {
      try {
        const updatedAnnotation = await annotationRendererServices.updateAnnotation(annotation);
        if (!updatedAnnotation) return null;

        setAnnotations([...annotations, updatedAnnotation]);
        return updatedAnnotation;
      } catch (error) {
        console.log('ctx.updateAnnotation', error);
      }
    },
    [annotationRendererServices.updateAnnotation],
  );
  const deleteAnnotation = useCallback(
    async (annotationId: number) => {
      try {
        await annotationRendererServices.deleteAnnotation(annotationId);
      } catch (error) {
        console.log('ctx.deleteAnnotation', error);
      }
    },
    [annotationRendererServices.deleteAnnotation],
  );
  const getAnnotations = useCallback(async () => {
    try {
      const annotationsData = await annotationRendererServices.getAnnotations();
      setAnnotations(annotationsData);
    } catch (error) {
      console.log('error', error);
    }
  }, [annotationRendererServices.getAnnotations]);

  return (
    <UserContext.Provider
      value={{
        categories,
        annotations,
        createCategory,
        updateCategory,
        deleteCategory,
        getCategories,
        createAnnotation,
        updateAnnotation,
        deleteAnnotation,
        getAnnotations,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};