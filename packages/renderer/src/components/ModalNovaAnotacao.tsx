
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, IconButton, Stack, TextField, Tooltip  } from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ClearIcon from '@mui/icons-material/Clear';
import MultipleSelectChip from './MultiSelectChip';
import type { TAnnotation, TAnnotationCategoryParams } from '../../../models/AnnotationModel';
import { useCallback, useEffect, useState } from 'react';
import { useAppContext } from '../context/app-context';
import { SNACKBAR_ID, SNACKBAR_MESSAGE, SNACKBAR_TYPE, useSnackbar } from '../context/snackbar-provider';
interface Props {
  open: boolean;
  handleClose: () => void;
  annotation?: TAnnotation;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
};

const getNameCategories = (annotationSelected: TAnnotation) => {
  if (!annotationSelected.categories) {
    return [];
  }
  return annotationSelected.categories.map(cat => cat.title);
};

export function ModalNovaAnotacao({ open, handleClose, annotation }: Props) {
  const { createAnnotation, categories, updateAnnotation } = useAppContext();
  const {handleModal} = useSnackbar();
  const [selectedCategories, setSelectedCategories] = useState<TAnnotationCategoryParams[]>([]);
  const [selectedCategoriesNames, setSelectedCategoriesNames] = useState<string[]>([]);
  const [nomeAnnotation, setNomeAnnotation] = useState('');
  const [contentAnnotation, setContentAnnotation] = useState('');

  useEffect(() => {
    if (annotation && annotation.id) {
      setNomeAnnotation(annotation.name);
      setContentAnnotation(annotation.content);
      setSelectedCategories(annotation.categories || []);
      setSelectedCategoriesNames(getNameCategories(annotation));
    }
    if (!open) {
      setNomeAnnotation('');
      setContentAnnotation('');
      setSelectedCategories([]);
      setSelectedCategoriesNames([]);
    }
  }, [annotation, open]);
  
  const handleCategoryChange = (data: string[]) => {
    const formattedData = categories
      .filter(category => data.includes(category.title))
      .map(cat => ({id: cat.id}));

    setSelectedCategories(formattedData);
    setSelectedCategoriesNames(data);
  };

  const handleAnnotation = useCallback(async() => {
    const data = {
      name: nomeAnnotation,
      content: contentAnnotation,
      categories: selectedCategories,
    };

    if (annotation?.id) {
      const newData = {
        ...data,
        id: annotation.id,
        categories: selectedCategories,
      };

      const updatedAnnotation = await updateAnnotation(newData);
      if (!updatedAnnotation) {
        handleModal({
          snackbarId: SNACKBAR_ID.ANNOTATION,
          message: SNACKBAR_MESSAGE.ANNOTATION_UPDATED_ERROR,
          type: SNACKBAR_TYPE.ERROR,
        });
        return;
      }
      handleModal({
        snackbarId: SNACKBAR_ID.ANNOTATION,
        message: SNACKBAR_MESSAGE.ANNOTATION_UPDATED,
        type: SNACKBAR_TYPE.SUCCESS,
      });

    } else {
      const createdCategory = await createAnnotation(data);
      if (!createdCategory) {
        handleModal({
          snackbarId: SNACKBAR_ID.ANNOTATION,
          message: SNACKBAR_MESSAGE.ANNOTATION_CREATED_ERROR_NAME_ALREADY_EXISTS,
          type: SNACKBAR_TYPE.ERROR,
        });
        return;
      }
      handleModal({
        snackbarId: SNACKBAR_ID.ANNOTATION,
        message: SNACKBAR_MESSAGE.ANNOTATION_CREATED,
        type: SNACKBAR_TYPE.SUCCESS,
      });
    }
    handleClose();
  }, [nomeAnnotation, contentAnnotation, selectedCategories, handleClose, createAnnotation, updateAnnotation]);

  const handleClear = useCallback(() => {
    setNomeAnnotation('');
    setContentAnnotation('');
    setSelectedCategories([]);
    setSelectedCategoriesNames([]);
  }, []);

  useEffect(() => {
    if (!annotation ?? !annotation?.id) {
      handleClear();
    }
  }, [annotation, handleClear]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{backdrop: Backdrop}}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Stack
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
            height={40}
            direction={'row'}
            sx={{
              bgcolor: 'background.default',
            }}
          >
            <Typography
              id="modal-title"
              variant="body1"
              component="h4"
              ml={2}
              sx={{color: 'primary.main'}}
            >
              Nova Anotação
            </Typography>
            <IconButton onClick={handleClose}>
              <ClearIcon
                fontSize="small"
                sx={{
                  color: 'grey.300',
                }}
              />
            </IconButton>
          </Stack>
          <Stack
            spacing={2}
            direction="column"
            p={2}
          >
            <TextField
              id="nome-annotation"
              label="Nome"
              variant="outlined"
              value={nomeAnnotation}
              onChange={e => setNomeAnnotation(e.target.value)}
              fullWidth
              sx={{
                '-webkit-app-region': 'no-drag',
                mb: 4,
                '& label.Mui-focused': {
                  color: 'grey.200', // Cor da label quando o TextField está focado
                },
                '& label': {
                  color: 'grey.200', // Cor da label em estado padrão
                },
                '& .MuiOutlinedInput-root': {
                  // Aplica estilos ao contorno e interior do TextField
                  '& fieldset': {
                    borderColor: 'grey.500', // Altera a cor da borda, opcional
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main', // Altera a cor da borda ao passar o mouse, opcional
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'grey.400', // Altera a cor da borda quando focado, opcional
                  },
                  backgroundColor: 'background.default', // Altera a cor de fundo do input
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'gray',
                  opacity: 1,
                },
                '& .MuiInputBase-input': {
                  fontSize: 12,
                  color: 'white', // Substitua 'green' pela cor desejada
                },
              }}
            />
            <TextField
              id="content-annotation"
              label="Anotação"
              multiline
              rows={4}
              fullWidth
              value={contentAnnotation}
              onChange={e => setContentAnnotation(e.target.value)}
              sx={{
                mb: 4,
                '& label.Mui-focused': {
                  color: 'grey.200', // Cor da label quando o TextField está focado
                },
                '& label': {
                  color: 'grey.200', // Cor da label em estado padrão
                },
                '& .MuiOutlinedInput-root': {
                  // Aplica estilos ao contorno e interior do TextField
                  '& fieldset': {
                    borderColor: 'grey.500', // Altera a cor da borda, opcional
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main', // Altera a cor da borda ao passar o mouse, opcional
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'grey.400', // Altera a cor da borda quando focado, opcional
                  },
                  backgroundColor: 'background.default', // Altera a cor de fundo do input
                },
                '& .MuiInputBase-input': {
                  fontSize: 12,
                  color: 'white', // Substitua 'green' pela cor desejada
                  '&.Mui-focused fieldset': {
                    color: 'red', // Altera a cor da borda quando focado, opcional
                  },
                },
                // Adicione mais estilos conforme necessário
              }}
            />
            <MultipleSelectChip
              title="Categorias"
              items={categories}
              valueSelected={selectedCategoriesNames}
              handleCategoryChange={handleCategoryChange}
            />
            <Stack
              direction={'row'}
              width={'100%'}
              gap={4}
              justifyContent={'flex-end'}
            >
              <Tooltip title="Limpar campos">
                <IconButton onClick={handleClear}>
                  <ClearAllIcon
                    fontSize="small"
                    sx={{
                      color: 'grey.300',
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                disabled={!nomeAnnotation || !contentAnnotation || !selectedCategoriesNames.length}
                onClick={handleAnnotation}
                sx={{
                  color: 'background.default',
                }}
              >
                Salvar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}