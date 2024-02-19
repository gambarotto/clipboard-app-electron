import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Chip, IconButton, Stack, darken, getLuminance, lighten } from '@mui/material';
import palette from '../../theme/palette';
import { useAppContext } from '../../context/app-context';
import { useCallback, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import type { TAnnotation } from '../../../../models/AnnotationModel';
import { ModalNovaAnotacao } from '../../components/ModalNovaAnotacao';

const getColorContrast = (color: string) => {
  const luminance = getLuminance(color);
  return luminance > 0.5 ? darken(color, 0.5) : lighten(color, 0.7);
};

export function AnnotationTab() {
  const [selectedAnnotation, setSelectedAnnotation] = useState<TAnnotation>();
  const [openModalAnnotation, setOpenModalAnnotation] = useState(false);

  const {
      palette: {grey},
    } = palette;

  const { annotations, deleteAnnotation, searchedAnnotations } = useAppContext();

  const [expanded, setExpanded] = useState<string | false>('');

  const data = useCallback(() => {
    if (searchedAnnotations.length > 0) {
      return searchedAnnotations;
    }
    return annotations;
  }, [annotations, searchedAnnotations]);

  const handleChangeAccordion =
    (panel: string, text: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      window.clipboard.writeText(text);
      setExpanded(newExpanded ? panel : false);
    };
  const handleDeleteAnnotation = useCallback(
    async (annotationId: number) => {
      await deleteAnnotation(annotationId);
    },
    [deleteAnnotation],
  );
  const handleOpenModalAnnotation = useCallback((annotation: TAnnotation) => {
    setSelectedAnnotation(annotation);
    setOpenModalAnnotation(true);
  }, [selectedAnnotation]);

  return (
    <>
      {data().length > 0 &&
        data().map(annotation => (
          <Accordion
            key={annotation.id}
            expanded={expanded === annotation.id.toString()}
            onChange={handleChangeAccordion(annotation.id.toString(), annotation.content)}
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
      <ModalNovaAnotacao
        open={openModalAnnotation}
        handleClose={() => setOpenModalAnnotation(false)}
        annotation={selectedAnnotation}
      />
    </>
  );
}