import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, TranslateModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer implements OnDestroy, OnInit{

  constructor() {
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
  }

  // novo: estado de autenticação observado
  isAuthenticated = false;

  // Method from Stackoverflow to smoothly scroll to top
  scrollTop(): void {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      (document.documentElement || document.body).scrollTop = 0 as any;
    }
  }
}

