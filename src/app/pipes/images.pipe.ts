import { environment } from './../../environments/environment.prod';
import { Pipe, PipeTransform } from '@angular/core';

const base_url = environment.base_url;

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {


  transform(image: string, type: 'users'|'hospitals'|'doctors'): string {

    if (image) {
      if (image.includes('https')) {
        return image;
      }
      else{
        return `${base_url}/upload/${type}/${ image}`;
      }
    }
    else{
      return `${base_url}/upload/${type}/no-image`;
    }


  }

}
