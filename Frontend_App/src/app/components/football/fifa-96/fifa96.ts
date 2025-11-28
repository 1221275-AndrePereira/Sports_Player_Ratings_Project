import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { FootballPlayerService } from '../../../services/football-player.service';
import { FootballPlayer, FootballPlayerFilter, FIFARating } from '../../../models/football-player.model';

@Component({
  selector: 'app-fifa-96',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fifa96.html',
  styleUrls: ['./fifa96.css'],
})
export class FIFA96Component implements OnInit {

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
  
  
    private destroy$ = new Subject<void>();
  
    constructor(
      private router: Router,
      private footballPlayerService: FootballPlayerService
    ){}
  
    ngOnInit(): void {
      this.loadFIFA96Players();
    }
  
    // ====================== Load Data ======================
    loadFIFA96Players() {
      this.isLoading = true;
      this.footballPlayerService.getFootballPlayersByGame('FIFA96')
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
      this.loadFIFA96Players();
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
}