import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private apiUrl = '/api'; // Ajustez l'URL selon votre configuration

  constructor(private http: HttpClient) {}

  getAllRequests(): Request[] {
    // Pour le moment, retournons des données de test
    return [
      {
        id: '1',
        userId: 'user1',
        requestType: 'LEAVE',
        status: 'PENDING',
        createdAt: new Date(),
        user: {
          id: 1,
          email: 'john.doe@example.com',
          firstname: 'John',
          lastname: 'Doe',
          role: 'EMPLOYEE'
        }
      },
      {
        id: '2',
        userId: 'user2',
        requestType: 'DOCUMENT',
        status: 'APPROVED',
        createdAt: new Date(),
        user: {
          id: 2,
          email: 'jane.smith@example.com',
          firstname: 'Jane',
          lastname: 'Smith',
          role: 'EMPLOYEE'
        }
      }
    ];
  }

  updateRequestStatus(id: string, status: string): void {
    // Implémentez la logique de mise à jour du statut
    console.log(`Updating request ${id} to status ${status}`);
  }
}
