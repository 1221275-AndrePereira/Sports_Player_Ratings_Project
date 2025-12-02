import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { FootballPlayerService } from '../../../services/football-player.service';
import { FootballPlayer, FootballPlayerFilter, FIFARating } from '../../../models/football-player.model';

@Component({
  selector: 'app-fifa-18',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fifa18.html',
  styleUrls: ['./fifa18.css'],
})
export class FIFA18Component implements OnInit {

    footballPlayers: FootballPlayer[] = [];
    filteredFootballPlayers: FootballPlayer[] = [];
    selectedFootballPlayer: FootballPlayer | null = null;
    searchTerm: string = '';
    isLoading: boolean = false;


    
    showAlert = false;

    alertMessage = '';

    alertTimer: any = null;
  
    statusMessage: string = '';
    statusMessageType: 'success' | 'error' | '' = '';
    statusHiding: boolean = false;

    sortColumn: string = '';
    sortDirection: 'asc' | 'desc' = 'asc';
  
  
    private destroy$ = new Subject<void>();
  
    constructor(
      private router: Router,
      private footballPlayerService: FootballPlayerService
    ){}
  
    ngOnInit(): void {
      this.loadFIFA18Players();
    }
  
    // ====================== Load Data ======================
    loadFIFA18Players() {
      this.isLoading = true;
      this.footballPlayerService.getFootballPlayersByGame('FIFA18')
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (footballPlayers) => {
            this.footballPlayers = footballPlayers;
            this.filteredFootballPlayers = [...footballPlayers];
            this.isLoading = false;
          },
          error: (error) => {
            this.showStatus('Error loading football players', 'error');
            console.error(error);
            this.isLoading = false;
          }
        });
    }

    refreshList() {
      this.loadFIFA18Players();
      this.selectedFootballPlayer = null;
      this.searchTerm = '';
    }
  
    // ====================== Helpers ======================
  
    private showStatus(message: string, type: 'success' | 'error') {
      this.statusMessage = message;
      this.statusMessageType = type;
      this.statusHiding = false;
      setTimeout(() => {
        this.statusMessage = '';
        this.statusMessageType = '';
        this.statusHiding = false;
      }, 3000);
    }


    getFlagPath(country: string): string {
      if (!country) return 'assets/flags/default.png';
      return 'assets/flags/' + country.trim().toLowerCase().replace(/ /g, '-') + '.png';
    }
    
    getClubPath(club: string | undefined): string {
      const clubName = club ?? 'default';
      return 'assets/clubs/' + clubName.toLowerCase().replace(/ /g, '-') + '.png';
    }

    // ====================== SORTING ======================
    sortBy(column: 'playerName' | 'country' | 'rating' | 'club' | 'position') {


      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {

        this.sortColumn = column;
        this.sortDirection = 'asc';
      }

      this.filteredFootballPlayers.sort((a, b) => {

        let valueA: any;
        let valueB: any;

        switch (column) {
          case 'playerName':
            valueA = a.playerName ?? '';
            valueB = b.playerName ?? '';
            break;

          case 'country':
            valueA = a.country ?? '';
            valueB = b.country ?? '';
            break;

          case 'rating':
            valueA = a.fifA18Rating?.overallRating ?? 0;
            valueB = b.fifA18Rating?.overallRating ?? 0;
            break;

          case 'club':
            valueA = a.fifA18Rating?.club ?? '';
            valueB = b.fifA18Rating?.club ?? '';
            break;

          case 'position':
            valueA = a.fifA18Rating?.position ?? '';
            valueB = b.fifA18Rating?.position ?? '';
            break;
        }

        if (typeof valueA === 'string') valueA = valueA.toLowerCase();
        if (typeof valueB === 'string') valueB = valueB.toLowerCase();

        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

    }

    // Helper for sort arrows
    getSortIcon(column: string) {
      if (this.sortColumn !== column) return '⇅';
      return this.sortDirection === 'asc' ? '▲' : '▼';
    }
}
