import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProgressComponent } from '../../components/progress/progress.component';
import { DragDropDirective } from '../../directives/drag-drop.directive';
import { FilesUploadService } from '../../services/files-upload.service';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ProgressComponent,
    DragDropDirective,
    ReactiveFormsModule,
  ],
  providers: [],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
})
export class UploadFileComponent {
  files: any[] = [];

  selectedFile: File;

  fileForm = new FormGroup({
    altText: new FormControl(''),
    description: new FormControl(''),
  });
  /**
   *
   */
  constructor(private http: HttpClient, private service: FilesUploadService) {}

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    console.log(files.files);
    console.log(files);
    this.prepareFilesList(files.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    console.log(files);
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  uploadMessage: string;
  uploadFile() {
    const fileToUpload = this.files[0];

    const formData: FormData = new FormData();
    formData.append('myFile', fileToUpload);
    formData.append('altText', this.fileForm.value.altText);
    formData.append('description', this.fileForm.value.description);

    this.service.uploadFile(formData).subscribe(
      (data) => {
        console.log(data);
        console.log(data);
        console.log(data);
        if (data.body) {
        this.uploadMessage = "File Uploaded Successfully";
        }
      },
      (error) => {
        console.log(error);
        console.log(error);
        console.log(error);
      }
    );
  }

  upload(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      this.service.uploadFile(file).subscribe(
        (data) => {
          console.log(data);
          if (data) {
            switch (data.type) {
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
