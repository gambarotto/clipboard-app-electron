import { Button } from '@mui/material';
import {CategoryRendererServices} from '../../../services/ipc-renderer/Category-renderer-services';
import {AnnotationRendererServices} from '../../../services/ipc-renderer/Annotation-renderer-services';

export default function Home() {

  const categoryRendererServices = new CategoryRendererServices(window.electron.ipcRenderer);
  const annotationRendererServices = new AnnotationRendererServices(window.electron.ipcRenderer);

  const createCategory = async () => {
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

  };const createAnnotation = async () => {
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
  };

  return (
    <>
      <Button onClick={createCategory}>Create Category</Button>
      <Button onClick={createAnnotation}>Create Annotation</Button>
    </>
  );
}