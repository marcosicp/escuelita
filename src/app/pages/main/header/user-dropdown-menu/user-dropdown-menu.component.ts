import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
  styleUrls: ['./user-dropdown-menu.component.scss'],
})
export class UserDropdownMenuComponent implements OnInit {
  public user;
  usuario: any;
  usuarioStr: '';
  
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu;
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideDropdownMenu();
    }
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService,
    private appService: AppService,
    public _auth: AuthService,
  ) {
    this.usuario = JSON.parse(localStorage.getItem('userEscuelita'));
    if(this.usuario.creado === undefined) {
      this.authService.SignOut();
    }
    this.usuario.creado = new Date(this.usuario.creado.seconds * 1000).toLocaleDateString();
    this.usuarioStr = this.usuario.email;
  }

  ngOnInit(): void {
    this.user = this.appService.user;
  }

  toggleDropdownMenu() {
    if (this.dropdownMenu.nativeElement.classList.contains('show')) {
      this.hideDropdownMenu();
    } else {
      this.showDropdownMenu();
    }
  }

  showDropdownMenu() {
    this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
  }

  hideDropdownMenu() {
    this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
  }

  logout() {
    this.appService.logout();
  }
}
