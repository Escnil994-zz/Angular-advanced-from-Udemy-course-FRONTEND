import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagesService {

  private _hideModal: boolean = true;

  public type: 'users' | 'doctors' | 'hospitals';
  public id: string;
  public image: string;

  public imageChenged: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get hideModal() {
    return this._hideModal;
  }

  openModal(type: 'users' | 'doctors' | 'hospitals',
    id: string, image: string = 'no-image'
  ) {
    this._hideModal = false;
    this.type = type;
    this.id = id;

    if (image.includes('https')) {
      this.image = image;
    } else {
      this.image = `${base_url}/upload/${type}/${image}`
      
      
    }
    /* this.image = image; */
  }

  closeModal() {
    this._hideModal = true;
  }
}
