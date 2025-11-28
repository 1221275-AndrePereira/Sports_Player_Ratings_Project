import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

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
  dropdownOpenResource = false;
  dropdownOpenOrganizations = false;
  dropdownOpenLang = false;

  /**
   * Controls the visibility of the mobile navigation (hamburger menu).
   * When true, the .open class is applied to the list container.
   */
  mobileMenuOpen = false;

  /** Current language code displayed in the header and used by TranslateService. */
  currentLang = '';

  // novo: estado de autenticação observado
  isAuthenticated = false;

  constructor(private translate: TranslateService) {
    /**
     * Initialize the current language from the translation service.
     * Falls back to the service default or 'en' when not set.
     */
    this.currentLang =
      this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.translate.use(this.currentLang);
  }

  /**
   * Toggle one of the primary dropdowns (Resource or Organizations).
   * - Ensures only one primary dropdown (and language) can be open at a time.
   * - Stops propagation to avoid document-level click handlers immediately closing it.
   */
  toggleDropdown(type: 'resource' | 'organizations', e?: Event) {
    e?.stopPropagation();
    if (type === 'resource') {
      this.dropdownOpenResource = !this.dropdownOpenResource;
      if (this.dropdownOpenResource) {
        this.dropdownOpenOrganizations = false;
        this.dropdownOpenLang = false;
      }
    } else {
      this.dropdownOpenOrganizations = !this.dropdownOpenOrganizations;
      if (this.dropdownOpenOrganizations) {
        this.dropdownOpenResource = false;
        this.dropdownOpenLang = false;
      }
    }
  }

  /**
   * Toggle the language dropdown.
   * - Closes other dropdowns when opened.
   * - Stops propagation to prevent immediate close from global click handler.
   */
  toggleLangDropdown(e?: Event) {
    e?.stopPropagation();
    this.dropdownOpenLang = !this.dropdownOpenLang;
    if (this.dropdownOpenLang) {
      this.dropdownOpenResource = false;
      this.dropdownOpenOrganizations = false;
    }
  }

  /**
   * Toggle the mobile menu (hamburger).
   * Uses the .open class on the list in the template to expand/collapse.
   */
  toggleMobileMenu(e?: Event) {
    e?.stopPropagation();
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  /**
   * Close all dropdowns (resource, organizations, language).
   * Does not alter the mobile menu state.
   */
  closeDropdown() {
    this.dropdownOpenResource = false;
    this.dropdownOpenOrganizations = false;
    this.dropdownOpenLang = false;
  }

  /**
   * Global click handler:
   * - Clicking anywhere outside the header closes all dropdowns and the mobile menu.
   */
  @HostListener('document:click')
  onDocumentClick() {
    this.closeDropdown();
    this.mobileMenuOpen = false;
  }

  /**
   * Global key handler (ESC):
   * - Pressing ESC closes all dropdowns and the mobile menu.
   */
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
