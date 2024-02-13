import { Button, Fade, Stack } from '@mui/material';

import { HexColorPicker } from 'react-colorful';
import { useCallback, useState } from 'react';

interface Props {
  open: boolean;
  handleClose: () => void;
  handleColorCategory: (color: string) => void;
  color: string;
}

export function ViewColorPicker({open, handleClose, color, handleColorCategory}: Props) {
  const [selectedColor, setSelectedColor] = useState( color ?? '#000000');

  const handleColor = useCallback(() => {
    handleColorCategory(selectedColor);
    handleClose();
  }, [selectedColor, handleColorCategory, handleClose]);

  return (
    <Fade in={open}>
      <Stack
        justifyContent={'space-between'}
        width={'100%'}
        direction={'row'}
        mt={2}
      >
        <HexColorPicker
          color={selectedColor}
          onChange={setSelectedColor}
        />
        <Stack flex={1} alignItems={'end'} justifyContent={'flex-end'}>

          <Button 
            sx={{
              width: 50,
              height: 50,
              backgroundColor: 'background.default',
            }} 
            onClick={handleColor}
            >
              Ok
          </Button>
        </Stack>

      </Stack>
    </Fade>
  );
}
