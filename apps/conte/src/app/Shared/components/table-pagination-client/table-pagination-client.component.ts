import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServerSidePages } from '../../models/pagination';
import { TreatmentPlanService } from '../../services/treatmentPlan.service';
import { TableHeaders } from '../../models/Generic';

@Component({
  selector: 'app-table-pagination-client',
  templateUrl: './table-pagination-client.component.html',
  styleUrls: ['./table-pagination-client.component.scss'],
})
export class TablePaginationClientComponent implements OnInit {
  @Input() headers: TableHeaders[] = [];
  @Input() data: any = [];
  @Input() paginateId: string = '1';
  @Input() hasActions: boolean = false;
  @Input() deleteFunction: (args: any) => void = () => null;
  @Input() userRoleDeleteFunction: (args: any) => void = () => null;
  @Input() editFunction: (args: any) => void = () => null;
  @Input() cloneFunction: (args: any) => void = () => null;
  @Input() previewFunction: (args: any) => void = () => null;
  @Input() responseFunction: (args: any) => void = () => null;
  @Input() assignFunction: (args: any) => void = () => null;
  @Input() downloadFunction: (args: any) => void = () => null;
  @Input() archivedFunction: (args: any) => void = () => null;
  @Input() orderByFunction: (args: any) => void = () => null;
  @Input() playContent: (args: any) => void = () => null;
  @Input() pauseContent: (args: any) => void = () => null;
  @Input() selectContent: (args: any) => void = () => null;
  @Input() addContent: () => void = () => null;
  @Input() createContent: (args: any) => void = () => null;
  @Input() groupAssignFunction: (args: any) => void = () => null;
  @Input() showChatButton: (args: any) => boolean = () => false;
  @Output() createChat = new EventEmitter<boolean>();
  @Output() createInbox = new EventEmitter<any>();
  @Output() setTotalPages = new EventEmitter<any>();
  @Input() createContentButtonText: string = '';
  @Input() selectedContent: {} = {};
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Input() showRowDisplay: boolean = true;
  @Input() isPaginationEnabled: boolean = true;
  // @Input() serverSidePagination? : ServerSidePages =undefined;
  @Input() serverSidePagination?: ServerSidePages = {
    currentPage: -1,
    totalPages: -1,
    firstPage: -1,
    lastPage: -1,
    nextPage: -1,
    prevPage: -1,
    total: -1,
  };

  @Input() paginationLastPage: () => void = () => null;
  @Input() paginationNextPage: () => void = () => null;
  @Input() paginationPrevPage: () => void = () => null;
  @Input() paginationFirstPage: () => void = () => null;
  @Input() paginationCustomPage: (pageNum: number) => void = () => null;
  @Input() createContentButtonOnCondition: boolean = false;
  @Input() style: string = 'block';
  totalPages: number = 1;
  toggleChat: boolean = false;
  idSpecificData: { id: number; data: any }[] = [];

  constructor(private treatmentPlanService: TreatmentPlanService) {
    this.toggleChat = true;
  }

  ngOnInit(): void {}

  ngOnChanges(): void {}

  getTotalPages() {
    if (this.totalPages && this.totalPages === Math.ceil(this.data.length / this.pageSize)) {
      return this.totalPages;
    } else if (this.data && this.pageSize) {
      this.totalPages = Math.ceil(this.data.length / this.pageSize);
      this.setTotalPages.emit(this.totalPages);
      return this.totalPages;
    }
    return 0;
  }

  showChat(record: any) {
    this.createChat.emit(this.toggleChat);
    this.createInbox.emit(record);
  }

  expanssionToggle(record: any) {
    if (record.expanssion === true) {
      record.expanssion = false;
    } else {
      this.treatmentPlanService.getTasks(record.id).then((resp) => {
        const match = this.idSpecificData.find((item) => item.id === record.id);

        if (!match) {
          this.idSpecificData.push({ id: record.id, data: resp.data });
        }
      });
      record.expanssion = true;
    }
  }

  getCurrentShowingRecords(pageSize: number, currentPage: number, totalRecords: number) {
    let last = pageSize * currentPage;
    const first = last - (pageSize - 1);
    if (last > totalRecords) last = totalRecords;
    return `${first} - ${last}`;
  }
}
