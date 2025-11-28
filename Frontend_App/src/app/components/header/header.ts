import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnDestroy, OnInit {
  /**
   * Independent UI state flags for dropdown visibility.
   * Bound to the template via *ngIf to render contents and [class.open] for caret rotation.
   */
  dropdownOpenFootball = false;
  openDecade: string | null = null;
  dropdownOpenOrganizations = false;

  /**
   * Controls the visibility of the mobile navigation (hamburger menu).
   * When true, the .open class is applied to the list container.
   */
  mobileMenuOpen = false;

  // novo: estado de autenticação observado
  isAuthenticated = false;



  fifaDecades = [
    {
      label: "1990's",
      value: "1990s",
      games: [
        { name: "1994-1995(FIFA 96)", route: "fifa96" },
        { name: "1995-1996(FIFA 97)", route: "fifa97" },
        { name: "1997-1998(FIFA 98)", route: "fifa98" },
        { name: "1998-1999(FIFA 99)", route: "fifa99" }
      ]
    },
    {
      label: "2000's",
      value: "2000s",
      games: [
        { name: "1999-2000(FIFA 2000)", route: "fifa2000" },
        { name: "2000-2001(FIFA 2001)", route: "fifa2001" },
        { name: "2001-2002(FIFA 2002)", route: "fifa2002" },
        { name: "2002-2003(FIFA 2003)", route: "fifa2003" },
        { name: "2003-2004(FIFA 2004)", route: "fifa2004" },
        { name: "2004-2005(FIFA 2005)", route: "fifa2005" },
        { name: "2005-2006(FIFA 06)", route: "fifa06" },
        { name: "2006-2007(FIFA 07)", route: "fifa07" },
        { name: "2007-2008(FIFA 08)", route: "fifa08" },
        { name: "2008-2009(FIFA 09)", route: "fifa09" }
      ]
    },
    {
      label: "2010's",
      value: "2010s",
      games: [
        { name: "2009-2010(FIFA 10)", route: "fifa10" },
        { name: "2010-2011(FIFA 11)", route: "fifa11" },
        { name: "2011-2012(FIFA 12)", route: "fifa12" },
        { name: "2012-2013(FIFA 13)", route: "fifa13" },
        { name: "2013-2014(FIFA 14)", route: "fifa14" },
        { name: "2014-2015(FIFA 15)", route: "fifa15" },
        { name: "2015-2016(FIFA 16)", route: "fifa16" },
        { name: "2016-2017(FIFA 17)", route: "fifa17" },
        { name: "2017-2018(FIFA 18)", route: "fifa18" },
        { name: "2018-2019(FIFA 19)", route: "fifa19" }
      ]
    },
    {
      label: "2020's",
      value: "2020s",
      games: [
        { name: "2019-2020(FIFA 20)", route: "fifa20" },
        { name: "2020-2021(FIFA 21)", route: "fifa21" },
        { name: "2021-2022(FIFA 22)", route: "fifa22" },
        { name: "2022-2023(FIFA 23)", route: "fifa23" },
        { name: "2023-2024(EA FC 24)", route: "eafc24" },
        { name: "2024-2025(EA FC 25)", route: "eafc25" },
        { name: "2025-2026(EA FC 26)", route: "eafc25" }
      ]
    }
  ];

  toggleFIFADecade(decade: string) {
    this.openDecade = this.openDecade === decade ? null : decade;
  }

  constructor() {
    
  }

  
  toggleDropdown(type: 'football' | 'organizations', e?: Event) {
    e?.stopPropagation();
    if (type === 'football') {
      this.dropdownOpenFootball = !this.dropdownOpenFootball;
      if (this.dropdownOpenFootball) {
        this.dropdownOpenOrganizations = false;
      }
    } else {
      this.dropdownOpenOrganizations = !this.dropdownOpenOrganizations;
      if (this.dropdownOpenOrganizations) {
        this.dropdownOpenFootball = false;
      }
    }
  }

  
  toggleMobileMenu(e?: Event) {
    e?.stopPropagation();
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  
  closeDropdown() {
    this.dropdownOpenFootball = false;
    this.dropdownOpenOrganizations = false;
  }

  
  @HostListener('document:click')
  onDocumentClick() {
    this.closeDropdown();
    this.mobileMenuOpen = false;
  }

  
  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeDropdown();
    this.mobileMenuOpen = false;
  }


  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
  }
}
