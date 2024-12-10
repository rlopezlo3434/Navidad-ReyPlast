import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  newGift: string = '';
  gifts: string[] = [];
  userName: string = '';
  shareableLink: string | null = null;

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('user');
    const encodedGifts = urlParams.get('gifts');

    if (userName) {
      this.userName = userName;
    }
    if (encodedGifts) {
      this.gifts = JSON.parse(decodeURIComponent(encodedGifts));
    }
  }

  setUser(event: Event): void {
    event.preventDefault();
    if (this.userName.trim()) {
      const currentUrl = window.location.href.split('?')[0];
      window.history.pushState({}, '', `${currentUrl}?user=${this.userName}`);
    } else {
      // Si el nombre se borra, reseteamos todo
      this.gifts = [];
      this.shareableLink = null;  // Reseteamos el enlace compartido
      const currentUrl = window.location.href.split('?')[0];
      window.history.pushState({}, '', currentUrl);  // Eliminar los parámetros de la URL
    }

    if (this.userName == ''){
      this.gifts = [];
      this.shareableLink = null;  // Reseteamos el enlace compartido
      const currentUrl = window.location.href.split('?')[0];
      window.history.pushState({}, '', currentUrl);  // Eliminar los parámetros de la URL
    }
  }

  checkUserName(): void {
    if (this.userName.trim() === '') {
      // Si el campo está vacío, reseteamos todo
      this.gifts = [];
      this.shareableLink = null;
      const currentUrl = window.location.href.split('?')[0];
      window.history.pushState({}, '', currentUrl); // Eliminar los parámetros de la URL
    }
  }

  addGift(event: Event): void {
    event.preventDefault();
    if (this.newGift.trim()) {
      this.gifts.push(this.newGift.trim());
      this.newGift = '';
    }
  }

  removeGift(index: number): void {
    this.gifts.splice(index, 1);
  }

  generateShareableLink(): void {
    const encodedGifts = encodeURIComponent(JSON.stringify(this.gifts));
    const link = `${window.location.origin}${window.location.pathname}?user=${this.userName}&gifts=${encodedGifts}`;
    this.shareableLink = link;
  }
}
