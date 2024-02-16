import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Chip, IconButton, Stack, getLuminance, darken, lighten } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import palette from '../theme/palette';
import { Footer } from '../components/Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { ModalNovaAnotacao } from '../components/ModalNovaAnotacao';
import { useCallback, useState } from 'react';
import { ModalNewCategory } from '../components/ModalNewCategory';
import { useUser } from '../context/user-context';
import type { TAnnotation } from '../../../models/AnnotationModel';
import { SNACKBAR_ID, useSnackbar } from '../context/snackbar-provider';

const getColorContrast = (color: string) => {
  const luminance = getLuminance(color);
  return luminance > 0.5 ? darken(color, 0.5) : lighten(color, 0.7);

};

export default function Home() {
  const { palette: { grey } } = palette;

  const { annotations, deleteAnnotation, getAnnotations } = useUser();
  const { CustomSnackBar } = useSnackbar();


  const [openModalAnnotation, setOpenModalAnnotation] = useState(false);
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<TAnnotation>();
  const [expanded, setExpanded] = useState<string | false>('');

  const handleChangeAccordion = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleCloseModalAnnotation = useCallback(() => {
    setOpenModalAnnotation(false);
  }, []);
  const handleOpenModalAnnotation = useCallback((annotation?: TAnnotation ) => {
    if (annotation) { 
      setSelectedAnnotation(annotation);
    }
    setOpenModalAnnotation(true);
  }, []);
  const handleCloseModalCategory = useCallback(() => {
    setOpenModalCategory(false);
  }, []);
  const handleOpenModalCategory = useCallback(() => {
    setOpenModalCategory(true);
  }, []);
  const handleDeleteAnnotation = useCallback(async(annotationId: number) => {
    await deleteAnnotation(annotationId);
    await getAnnotations();
  }, [deleteAnnotation]);
  
  return (
    <Stack sx={{}}>
      {annotations.length > 0 &&
        annotations.map(annotation => (
          <Accordion
            key={annotation.id}
            expanded={expanded === annotation.id.toString()}
            onChange={handleChangeAccordion(annotation.id.toString())}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{color: grey[200]}} />}
              aria-controls="content"
              id="header"
            >
              {annotation.name}
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                {annotation.content}
                <Stack
                  direction="row"
                  gap={2}
                  mt={2}
                  alignItems={'center'}
                >
                  {annotation.categories.map(category => (
                    <Chip
                      key={category.id}
                      variant="filled"
                      label={category.title}
                      sx={{
                        backgroundColor: category.color,
                        color: getColorContrast(category.color),
                        fontWeight: 'bold',
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </AccordionDetails>
            <AccordionActions>
              <IconButton onClick={() => handleDeleteAnnotation(annotation.id)}>
                <DeleteIcon
                  fontSize="small"
                  sx={{
                    color: grey[200],
                  }}
                />
              </IconButton>
              <IconButton onClick={() => handleOpenModalAnnotation(annotation)}>
                <EditNoteIcon
                  sx={{
                    color: 'primary.main',
                  }}
                />
              </IconButton>
            </AccordionActions>
          </Accordion>
        ))}

      <Footer
        handleOpenAnnotation={handleOpenModalAnnotation}
        handleOpenCategory={handleOpenModalCategory}
      />
      <ModalNovaAnotacao
        open={openModalAnnotation}
        handleClose={handleCloseModalAnnotation}
        annotation={selectedAnnotation}
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