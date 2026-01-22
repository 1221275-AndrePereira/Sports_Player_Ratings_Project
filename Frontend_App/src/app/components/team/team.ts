import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { FootballPlayerService } from '../../services/team.service';
import { FootballPlayer, FootballPlayerFilter, FIFARating } from '../../../models/football-player.model';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team.html',
  styleUrls: ['./team.css'],
})
export class TeamComponent implements OnInit {

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
      this.loadTeams();
    }
  
    // ====================== Load Data ======================
    loadTeams() {
      this.isLoading = true;
      this.footballPlayerService.getFootballPlayersByGame('FIFA23')
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (teams) => {
            this.footballPlayers = teams;
            this.filteredFootballPlayers = [...teams];
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
      this.loadFIFA23Players();
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
    
    getTeamPath(team: string | undefined): string {
      const teamName = team ?? 'default';
      return 'assets/teams/' + teamName.toLowerCase().replace(/ /g, '-') + '.png';
    }
}
