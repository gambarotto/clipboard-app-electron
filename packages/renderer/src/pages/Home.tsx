import { Footer } from '../components/Footer';
import { ModalNovaAnotacao } from '../components/ModalNovaAnotacao';
import { useCallback, useEffect, useState } from 'react';
import { ModalNewCategory } from '../components/ModalNewCategory';
import { SNACKBAR_ID, useSnackbar } from '../context/snackbar-provider';
import { Stack, Tab, Tabs } from '@mui/material';
import { AnnotationTab, CategoryTab, CustomTabPanel } from './Tabs';
import { useAppContext } from '../context/app-context';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const { CustomSnackBar } = useSnackbar();

  const {getAnnotations, getCategories, handleChangeTab, tabIndex} = useAppContext();

  const [openModalAnnotation, setOpenModalAnnotation] = useState(false);
  const [openModalCategory, setOpenModalCategory] = useState(false);

  useEffect(() => {
    if (tabIndex === 0) {
      getAnnotations();
    }
    if (tabIndex === 1) {
      getCategories();
    }
  }, [tabIndex]);

  const handleCloseModalAnnotation = useCallback(() => {
    setOpenModalAnnotation(false);
  }, []);
  const handleOpenModalAnnotation = useCallback(() => {
    setOpenModalAnnotation(true);
  }, []);
  const handleCloseModalCategory = useCallback(() => {
    setOpenModalCategory(false);
  }, []);
  const handleOpenModalCategory = useCallback(() => {
    setOpenModalCategory(true);
  }, []);
  
  return (
    <Stack sx={{}}>
      <Tabs
        value={tabIndex}
        onChange={handleChangeTab}
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tab
          label="Anotações"
          sx={{flex: 1, color: 'grey.300'}}
          {...a11yProps(0)}
        />
        <Tab
          label="Categorias"
          sx={{flex: 1, color: 'grey.300'}}
          {...a11yProps(1)}
        />
      </Tabs>
      <CustomTabPanel
        value={tabIndex}
        index={0}
      >
        <AnnotationTab />
      </CustomTabPanel>
      <CustomTabPanel
        value={tabIndex}
        index={1}
      >
        <CategoryTab />
      </CustomTabPanel>
      <Footer
        handleOpenAnnotation={handleOpenModalAnnotation}
        handleOpenCategory={handleOpenModalCategory}
      />
      <ModalNovaAnotacao
        open={openModalAnnotation}
        handleClose={handleCloseModalAnnotation}
      />
      <ModalNewCategory
        open={openModalCategory}
        handleClose={handleCloseModalCategory}
      />
      <CustomSnackBar snackbarId={SNACKBAR_ID.CATEGORY} />
      <CustomSnackBar snackbarId={SNACKBAR_ID.ANNOTATION} />
    </Stack>
  );
}