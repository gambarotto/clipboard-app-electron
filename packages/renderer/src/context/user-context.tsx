import { createContext, useContext, useEffect, useState } from 'react';
import type { TCategory, TCreateCategoryParams } from '../../../models/CategoryModel';
import type { TAnnotation, TCreateAnnotationParams } from '../../../models/AnnotationModel';
import { CategoryRendererServices } from '../../../services/ipc-renderer/Category-renderer-services';
import { AnnotationRendererServices } from '../../../services/ipc-renderer/Annotation-renderer-services';

type TInitialState = {
  categories: TCategory[];
  annotations: TAnnotation[];
  createCategory(category: TCreateCategoryParams): Promise<void>;
  createAnnotation(annotation: TCreateAnnotationParams): Promise<void>;
};

const UserContext = createContext<TInitialState>({} as TInitialState);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [annotations, setAnnotations] = useState<TAnnotation[]>([]);
  
  const categoryRendererServices = new CategoryRendererServices(window.electron.ipcRenderer);
  const annotationRendererServices = new AnnotationRendererServices(window.electron.ipcRenderer);

  useEffect(() => {
    if (window.electron.ipcRenderer) {
      categoryRendererServices
        .getCategories()
        .then(categoriesData => {
          setCategories(categoriesData);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }, []);

  useEffect(() => {
    annotationRendererServices
      .getAnnotations()
      .then(annotationsData => {
        setAnnotations(annotationsData);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  async function createCategory (category: TCreateCategoryParams) {
    try {
      const newCategory = await categoryRendererServices.createCategory(category);
      setCategories([...categories, newCategory]);
    } catch (error) {
      console.log('error', error);
    }
  }
  async function createAnnotation (annotation: TCreateAnnotationParams) {
    try {
      const newAnnotation = await annotationRendererServices.createAnnotation(annotation);
      setAnnotations([...annotations, newAnnotation]);
    } catch (error) {
      console.log('error', error);
    }
  }

  return <UserContext.Provider value={{categories, annotations, createAnnotation, createCategory}}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};