import { Stack, TextField } from '@mui/material';

const TOOLBAR_HEIGHT = 50;

export function ToolBar() {
  return (
    <Stack
      direction="row"
      bgcolor={'background.default'}
      height={TOOLBAR_HEIGHT}
      width={'100%'}
      sx={{
        '-webkit-app-region': 'drag',
        p: 1,
        position: 'relative',
        alignItems: 'center',
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        placeholder="Pesquisar"
        sx={{
          '-webkit-app-region': 'no-drag',
          zIndex: 1000,
          width: 200,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            height: 30,
            '& fieldset': {
              borderColor: 'gray',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
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
    </Stack>
  );
}