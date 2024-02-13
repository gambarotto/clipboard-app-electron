
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, IconButton, Stack, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { useCallback, useState } from 'react';
import { ViewColorPicker } from './ViewColorPicker';

interface Props {
  open: boolean;
  handleClose: () => void;
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


export function ModalNewCategory({ open, handleClose }: Props) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorCategory, setColorCategory] = useState('');

  const handleCloseColorPicker = useCallback(() => {
    setShowColorPicker(false);
  }, []);
  const handleColorCategory = useCallback((color: string) => {
      setColorCategory(color);
  }, []);
  //const [categories, setCategories] = React.useState('');

  /* const handleChange = (event: SelectChangeEvent) => {
    setCategories(event.target.value as string);
  }; */
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
              Nova Categoria
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
            direction="column"
            p={2}
          >
            <TextField
              label="Nome da Categoria"
              variant="outlined"
              fullWidth
              sx={{
                '-webkit-app-region': 'no-drag',
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
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              mt={2}
            >
              <Button
                variant="text"
                size="small"
                endIcon={<ColorLensIcon />}
                onClick={() => setShowColorPicker(true)}
              >
                Escolha uma cor
              </Button>
              {colorCategory && (
                <Stack
                  width={30}
                  height={30}
                  borderRadius={1}
                  bgcolor={colorCategory}
                />
              )}
            </Stack>
            {showColorPicker && (
              <ViewColorPicker
                open={showColorPicker}
                handleClose={handleCloseColorPicker}
                color={colorCategory}
                handleColorCategory={handleColorCategory}
              />
            )}
            <Stack
              direction={'row'}
              width={'100%'}
              gap={4}
              justifyContent={'flex-end'}
              alignItems={'center'}
              mt={4}
            >
              <Button
                variant="contained"
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