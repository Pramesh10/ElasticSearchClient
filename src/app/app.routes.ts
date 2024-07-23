import { Routes } from '@angular/router';
import { SearchFileComponent } from './search-file-components/search-file/search-file.component';
import { UploadFileComponent } from './search-file-components/upload-file/upload-file.component';

export const routes: Routes = [
  {
    path: 'upload',
    component: UploadFileComponent,
  },
  {
    path: 'search',
    component: SearchFileComponent,
  },
];
