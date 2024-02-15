import type { TAnnotation, TCreateAnnotationParams, TUpdateAnnotationParams } from '../../models/AnnotationModel';
import type { ElectronAPI } from '@electron-toolkit/preload';

export class AnnotationRendererServices {
  private ipcElectron: ElectronAPI[ 'ipcRenderer' ];
  constructor(ipcRenderer: ElectronAPI[ 'ipcRenderer' ]) {
    this.ipcElectron = ipcRenderer;
  }
  async createAnnotation({ name, content, categories }: TCreateAnnotationParams): Promise<TAnnotation> {
    const annotation = this.ipcElectron.sendSync('create-annotation', { name, content, categories });
    return annotation;
  }
  async updateAnnotation({ id, name, content, categories }: TUpdateAnnotationParams): Promise<TAnnotation | undefined> {
    const annotation = this.ipcElectron.sendSync('update-annotation', { id, name, content, categories });
    return annotation;
  }
  async deleteAnnotation(annotationId: number) {
    this.ipcElectron.sendSync('delete-annotation', annotationId);
  }
  async getAnnotations(): Promise<TAnnotation[]> {
    const annotations = this.ipcElectron.sendSync('get-annotations');
    return annotations;
  }
  async getAnnotation(annotationId: number): Promise<TAnnotation | undefined> {
    const annotation = this.ipcElectron.sendSync('get-annotation', annotationId);
    return annotation;
  }
}