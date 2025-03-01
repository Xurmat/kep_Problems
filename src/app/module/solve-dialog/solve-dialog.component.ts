import { Component } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { SolveDialogService } from '..//..//service/solve-dialog/solve-dialog.service';
import { SolveDialog, SolveDialogRequest } from '../../interface/solveDialog';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-solve-dialog',
  imports: [
    HttpClientModule,
    TableModule,
    InputTextModule,
    FormsModule,
    TagModule,
    CommonModule
  ],
  templateUrl: './solve-dialog.component.html',
  styleUrl: './solve-dialog.component.scss'
})
export class SolveDialogComponent {

  solveDialogs: SolveDialog[] = [];
  totalRecords: number = 0;
  globalFilter = '';
  request: SolveDialogRequest = {
    first: 0,
    rows: 10,
    sortField: '',
    sortOrder: 1,
    filter: {
      firstName: ''
    }
  }
  constructor(private solveDialogService: SolveDialogService) { }

  getSolveDialogList() {
    this.solveDialogService.getSolveDialogs(this.request).subscribe(
      data => {
        console.log('Backenddan kelgan ma\'lumotlar:', data);
        this.solveDialogs = data.items;
        this.totalRecords = data.total;
      },
      error => {
        console.error('Xatolik:', error);
      }
    );
  }

  loadSolveDialogs($event: TableLazyLoadEvent) {
    console.log($event);
    this.request.sortField = $event.sortField || '';
    this.request.sortOrder = $event.sortOrder || 1;
    this.request.first = $event.first || 0
    this.getSolveDialogList();
  }

  filterSolveDialog() {
    this.request = {
      ...this.request,
      first: 0,
      filter: {
        firstName: this.globalFilter
      }
    }
    this.getSolveDialogList();
  }


}
