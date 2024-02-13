import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, IconButton, Stack } from '@mui/material';
/* import {CategoryRendererServices} from '../../../services/ipc-renderer/Category-renderer-services';
import {AnnotationRendererServices} from '../../../services/ipc-renderer/Annotation-renderer-services'; */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import palette from '../theme/palette';
import { Footer } from '../components/Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { ModalNovaAnotacao } from '../components/ModalNovaAnotacao';
import { useCallback, useState } from 'react';
import { ModalNewCategory } from '../components/ModalNewCategory';

export default function Home() {
  const { palette: { grey } } = palette;
/*   const categoryRendererServices = new CategoryRendererServices(window.electron.ipcRenderer);
  const annotationRendererServices = new AnnotationRendererServices(window.electron.ipcRenderer); */
  const [openModalAnnotation, setOpenModalAnnotation] = useState(false);
  const [openModalCategory, setOpenModalCategory] = useState(false);

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
  /* const createCategory = async () => {
    try {
      const category = await categoryRendererServices.createCategory({
        title: 'Category 8',
        active: true,
        color: 'yellow',
      });
      console.log('Category created', category);
      
    } catch (error) {
      console.log('error', error);
    }

  };
  const createAnnotation = async () => {
    try {
      const annotation = await annotationRendererServices.createAnnotation({
        name: 'Annotation 1',
        content: 'Annotation Content',
        categories: [{id: 8}, {id: 6}],
      });
      console.log('Annotation created', annotation);
    } catch (error) {
      console.log('error', error);
    }
  }; */

  return (
    <Stack sx={{}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: grey[200]}} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Accordion 1
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <IconButton>
            <DeleteIcon
              fontSize="small"
              sx={{
                color: grey[200],
              }}
            />
          </IconButton>
          <IconButton>
            <EditNoteIcon
              sx={{
                color: 'primary.main',
              }}
            />
          </IconButton>
        </AccordionActions>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: grey[200]}} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Accordion2
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: grey[200]}} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Accordion 1
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Footer handleOpenAnnotation={handleOpenModalAnnotation} handleOpenCategory={handleOpenModalCategory}/>
      <ModalNovaAnotacao
        open={openModalAnnotation}
        handleClose={handleCloseModalAnnotation}
      />
      <ModalNewCategory open={openModalCategory} handleClose={handleCloseModalCategory}  />
    </Stack>
  );
}