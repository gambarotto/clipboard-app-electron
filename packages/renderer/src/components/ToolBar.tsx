import { Stack, TextField } from '@mui/material';
import { useAppContext } from '../context/app-context';
import { useCallback, useEffect, useState } from 'react';

const TOOLBAR_HEIGHT = 56;

export function ToolBar() {
  const { handleSearchAnnotations, handleSearchCategories, tabIndex } = useAppContext();
  const [value,setValue] = useState('');

  const handleSearch = useCallback((text: string) => {
    if (tabIndex === 0) {

      handleSearchAnnotations(text);
      setValue(text);
    }
    if (tabIndex === 1) {
      handleSearchCategories(text);
      setValue(text);
    }
  }, [tabIndex, handleSearchAnnotations, handleSearchCategories]);

  useEffect(() => {
      if (value === ''){
        return;
      }
      if (tabIndex === 0) {
        handleSearchAnnotations('');
      }
      if (tabIndex === 1) {
        handleSearchCategories('');
      }
      setValue('');

  }, [tabIndex]);

  return (
    <Stack
      direction="row"
      bgcolor={'background.default'}
      height={TOOLBAR_HEIGHT}
      width={'100%'}
      sx={{
        WebkitAppRegion: 'drag',
        p: 1,
        position: 'relative',
        alignItems: 'center',
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        placeholder="Pesquisar"
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        sx={{
          WebkitAppRegion: 'no-drag',
          zIndex: 1000,
          width: 200,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            height: 40,
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
            color: 'white', // Substitua 'green' pela cor desejada
          },
        }}
      />
    </Stack>
  );
}