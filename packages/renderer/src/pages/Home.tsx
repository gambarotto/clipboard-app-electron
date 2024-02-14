import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, IconButton, Stack } from '@mui/material';
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

export default function Home() {
  const { palette: { grey } } = palette;

  const { annotations } = useUser();

  const [openModalAnnotation, setOpenModalAnnotation] = useState(false);
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<TAnnotation>();

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

  return (
    <Stack sx={{}}>
      {annotations.length > 0 &&
        annotations.map(annotation => (
          <Accordion key={annotation.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{color: grey[200]}} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {annotation.name}
            </AccordionSummary>
            <AccordionDetails>{annotation.content}</AccordionDetails>
            <AccordionActions>
              <IconButton>
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
    </Stack>
  );
}