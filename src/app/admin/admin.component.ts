import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../services/requests.service';
import { Request } from '../models/request.model';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [CommonModule, SearchBarComponent]
})
export class AdminComponent implements OnInit {
  onSearch(searchTerm: string) {
    if (!searchTerm) {
      this.filteredRequests = [...this.requests];
      return;
    }
    const term = searchTerm.toLowerCase();
    this.filteredRequests = this.requests.filter(request =>
      (request.user?.firstname?.toLowerCase().includes(term) ||
      request.user?.lastname?.toLowerCase().includes(term) ||
      request.userId?.includes(term))
    );
  }
  requests: Request[] = [];
  filteredRequests: Request[] = [];

  constructor(
    private requestsService: RequestsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.requests = this.requestsService.getAllRequests();
    this.filteredRequests = [...this.requests];
  }

  editRequest(id: string) {
    this.router.navigate(['/requests/edit', id]);
  }

  approveRequest(id: string) {
    this.requestsService.updateRequestStatus(id, 'APPROVED');
    this.loadRequests();
  }

  rejectRequest(id: string) {
    this.requestsService.updateRequestStatus(id, 'REJECTED');
    this.loadRequests();
  }
}