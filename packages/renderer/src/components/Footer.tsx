import { IconButton, Stack, Tooltip } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';

interface Props {
  handleOpenAnnotation: () => void;
  handleOpenCategory: () => void;
}

export function Footer({ handleOpenAnnotation, handleOpenCategory }: Props) {
  return (
    <footer>
      <Stack
        direction="row"
        bgcolor={'background.paper'}
        height={40}
        width={'100%'}
        sx={{
          p: 1,
          position: 'absolute',
          alignItems: 'center',
          bottom: 0,
        }}
      >
        <Tooltip title="Nova Anotação">
          <IconButton onClick={handleOpenAnnotation}>
            <PlaylistAddIcon
              sx={{
                color: 'grey.200',
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Nova Categoria">
          <IconButton onClick={handleOpenCategory}>
            <PostAddIcon
              sx={{
                color: 'grey.200',
              }}
            />
          </IconButton>
        </Tooltip>
      </Stack>
    </footer>
  );
}