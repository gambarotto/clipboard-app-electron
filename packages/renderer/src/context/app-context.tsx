import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { TCategory, TCreateCategoryParams } from '../../../models/CategoryModel';
import type { TAnnotation, TCreateAnnotationParams, TUpdateAnnotationParams } from '../../../models/AnnotationModel';
import { CategoryRendererServices } from '../../../services/ipc-renderer/Category-renderer-services';
import { AnnotationRendererServices } from '../../../services/ipc-renderer/Annotation-renderer-services';

type TInitialState = {
  categories: TCategory[];
  searchedCategories: TCategory[];
  annotations: TAnnotation[];
  searchedAnnotations: TAnnotation[];
  handleSearchCategories: (text: string) => void;
  createCategory: (category: TCreateCategoryParams) => Promise<TCategory | null | undefined>;
  updateCategory: (category: TCategory) => Promise<TCategory | null | undefined>;
  deleteCategory: (categoryId: number) => Promise<void>;
  getCategories: () => Promise<void>;
  handleSearchAnnotations: (text: string) => void;
  createAnnotation: (
    annotation: TCreateAnnotationParams,
  ) => Promise<TAnnotation | null | undefined>;
  updateAnnotation: (
    annotation: TUpdateAnnotationParams,
  ) => Promise<TAnnotation | null | undefined>;
  deleteAnnotation: (annotationId: number) => Promise<void>;
  getAnnotations: () => Promise<void>;
  tabIndex: number;
  handleChangeTab: (event: React.SyntheticEvent, newValue: number) => void;
};

const AppContext = createContext<TInitialState>({} as TInitialState);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [annotations, setAnnotations] = useState<TAnnotation[]>([]);

  const [tabIndex,setTabIndex] = useState(0);
  
  const [searchedCategories, setSearchedCategories] = useState<TCategory[]>([]);
  const [searchedAnnotations, setSearchedAnnotations] = useState<TAnnotation[]>([]);

  const categoryRendererServices = new CategoryRendererServices(window.electron.ipcRenderer);
  const annotationRendererServices = new AnnotationRendererServices(window.electron.ipcRenderer);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getAnnotations();
  }, []);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // Categories
  const handleSearchCategories = useCallback((text: string) => {
    const filterCategories = categories.filter((category) => category.title.toLowerCase().includes(text.toLowerCase()));
    setSearchedCategories(filterCategories);
  }, [categories]);
  const createCategory = useCallback(
    async (category: TCreateCategoryParams) => {
      try {
        const newCategory = await categoryRendererServices.createCategory(category);
        if (!newCategory) return null;
        await getCategories();
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

        await getCategories();
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
        await getCategories();
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
  const handleSearchAnnotations = useCallback((text: string) => {
    const filterNameAnnotations = annotations.filter((annotation) => annotation.name.toLowerCase().includes(text.toLowerCase()));
    const filterContentAnnotations = annotations.filter(annotation =>
      annotation.content.toLowerCase().includes(text.toLowerCase()),
    );
    const setSearch = new Set([...filterNameAnnotations, ...filterContentAnnotations]);
    setSearchedAnnotations(Array.from(setSearch));
  }, [annotations]);
  const createAnnotation = useCallback(
    async (annotation: TCreateAnnotationParams) => {
      try {
        const newAnnotation = await annotationRendererServices.createAnnotation(annotation);
        if (!newAnnotation) return null;
        await getAnnotations();
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
        await getAnnotations();
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
        await getAnnotations();
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
    <AppContext.Provider
      value={{
        categories,
        searchedCategories,
        annotations,
        searchedAnnotations,
        handleSearchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        getCategories,
        handleSearchAnnotations,
        createAnnotation,
        updateAnnotation,
        deleteAnnotation,
        getAnnotations,
        tabIndex,
        handleChangeTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};