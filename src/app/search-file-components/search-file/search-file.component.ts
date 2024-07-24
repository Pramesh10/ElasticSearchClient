import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ElasticSearchService } from '../../services/elastic-search.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-search-file',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [],
  templateUrl: './search-file.component.html',
  styleUrl: './search-file.component.scss',
})
export class SearchFileComponent implements OnInit {
  searchForm: FormGroup;
  filesList: any;

  fileUrl;
  constructor(
    private fb: FormBuilder,
    private searchService: ElasticSearchService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchInput: [''],
    });

    this.onChanges();
  }

  onChanges(): void {
    this.searchForm.get('searchInput').valueChanges.subscribe((value) => {
      if (value.length > 5) {
        this.performSearch(value);
      }
    });
  }
  isFetchingData: boolean = false;
  performSearch(query: string): void {
    this.filesList = [];
    console.log('Performing search with query:', query);
    // Add your search logic here
    this.isFetchingData = true;
    this.searchService.elasticSearch(query).subscribe({
      next: (data) => {
        this.filesList = data;
        console.log(this.filesList);
        this.isFetchingData = false;
      },
      error: (error) => {
        this.isFetchingData = false;
      },
    });
  }

  downloadFile(id: number, contentType: string) {
    return this.http
      .get(`https://localhost:7299/api/Files/${id}`, { responseType: 'blob' })
      .subscribe((blobs: Blob) => {
        const blob = new Blob([blobs], { type: contentType });
        saveAs(blob, '');
      });
  }
}
