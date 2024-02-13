
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, IconButton, Stack, TextField, Tooltip  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import MultipleSelectChip from './MultiSelectChip';

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


export function ModalNovaAnotacao({ open, handleClose }: Props) {
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
              label="Nome"
              variant="outlined"
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
              id="outlined-multiline-static"
              label="Anotação"
              multiline
              rows={4}
              fullWidth
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
              items={names}
            />
            <Stack
              direction={'row'}
              width={'100%'}
              gap={4}
              justifyContent={'flex-end'}
            >
              <Tooltip title="Limpar campos">
                <IconButton>
                  <DeleteIcon
                    fontSize="small"
                    sx={{
                      color: 'grey.300',
                    }}
                  />
                </IconButton>
              </Tooltip>
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