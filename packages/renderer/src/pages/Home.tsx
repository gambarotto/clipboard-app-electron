import { Button } from '@mui/material';

export default function Home() {
  const createCategory = async () => {
    const category = await window.ipcRenderer.send('create-category', {
      title: 'Category 1',
      active: true,
      color: 'red',
    });
    console.log('Category created:', category);
    
  };

  return <Button onClick={createCategory}>Create Category</Button>;
}