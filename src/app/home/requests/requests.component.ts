import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RequestsService, Request } from './requests.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  requests: Request[] = [];
  filteredRequests: Request[] = [];
  selectedStatus: string = 'all';
  isAdmin: boolean = false;
  searchId: string = '';

  statusOptions = [
    { value: 'all', label: 'Toutes les demandes' },
    { value: 'En attente', label: 'En attente' },
    { value: 'Approuvée', label: 'Approuvées' },
    { value: 'Rejetée', label: 'Rejetées' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private requestsService: RequestsService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    if (this.isAdmin) {
      this.requestsService.getAllRequests().subscribe(requests => {
        this.requests = requests;
        this.filterRequests();
      });
    } else {
      this.requestsService.getRequests().subscribe(requests => {
        this.requests = requests;
        this.filterRequests();
      });
    }
  }

  filterRequests() {
    this.filteredRequests = this.requests.filter(request => {
      const matchesStatus = this.selectedStatus === 'all' || request.status === this.selectedStatus;
      const matchesId = !this.searchId || request.id.toLowerCase().includes(this.searchId.toLowerCase());
      return matchesStatus && matchesId;
    });
  }

  onStatusChange() {
    this.filterRequests();
  }

  onSearchChange() {
    this.filterRequests();
  }

  createNewRequest() {
    this.router.navigate(['/home/requests/new']);
  }

  viewDetails(id: string) {
    this.router.navigate(['/home/requests', id]);
  }

  editRequest(id: string, type: string) {
    // Normaliser le type pour les congés spéciaux et les prêts
    const normalizedType = type.toLowerCase();
    
    if (normalizedType.includes('congé')) {
      this.router.navigate(['/home/requests/leave/edit', id]);
    } else if (normalizedType.includes('formation')) {
      this.router.navigate(['/home/requests/training/edit', id]);
    } else if (normalizedType.includes('attestation')) {
      this.router.navigate(['/home/requests/certificate/edit', id]);
    } else if (normalizedType.includes('prêt')) {
      this.router.navigate(['/home/requests/loan/edit', id]);
    } else if (normalizedType.includes('avance')) {
      this.router.navigate(['/home/requests/advance/edit', id]);
    } else if (normalizedType.includes('document')) {
      this.router.navigate(['/home/requests/document/edit', id]);
    }
  }
}
