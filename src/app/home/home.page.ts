import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { ModalController } from '@ionic/angular';
import { AthleteModalPage } from '../athlete-modal/athlete-modal.page';

const group_id = 'tokyo2020';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  image: any;

  constructor(
    private camera: Camera,
    public httpService: HttpService,
    public modalController: ModalController,
    private router: Router,
  ) {}

  onPhoto = () => {
    const options: CameraOptions = {
      quality: 1,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      // console.log(this.image);

      this.identify(this.image);

      /*
      this.httpService.http(this.url + 'registerImage.php', body).subscribe(
        res => {
          console.log('photo has saved');
          this.alertPhoto0();
        },
        error => {
          this.postObj['image'] = '';
          const errorbody = this.postObj;
          this.gs.http(this.url + 'registerImage.php', errorbody);
          this.alertPhoto();
        }
      );
      */
    });
  }

  identify = (image: any) => {
    // Detect
    let url: string = environment.endpoint + 'detect';
    let blob = this.makeblob(image);
    this.httpService.httpFaceApiBinary(url, blob).subscribe(
      res => {
        // Identify
        let url: string = environment.endpoint + 'identify';
        const body = {
          "faceIds": [res[0]["faceId"]],
          "personGroupId": group_id,
          "maxNumOfCandidatesReturned": 1,
          "confidenceThreshold": 0.5
        }
        this.httpService.httpFaceApi(url, body).subscribe(
          res => {
            // Get User Information
            // console.log(res);
            let personId: string = res[0]['candidates'][0]['personId']
            const url: string = environment.endpoint + 'persongroups/' + group_id + '/persons/' + personId;

            this.httpService.httpFaceApiGet(url).subscribe(
              res => {
                console.log(res);
                console.log(res["name"])

                const url = environment.api + 'athlete?athlete=' + res["name"];
                console.log(localStorage.token);
                
                this.httpService.httpGet(url, localStorage.token).subscribe(
                  res => {
                    console.log(res);
                    localStorage.athlete_name = res["name"];
                    localStorage.athlete_sport = res["sport"];
                    localStorage.athlete_episode = res["episode"];
                    localStorage.athlete_charm = res["charm"];
                    localStorage.wiki_url = res["wiki_url"];
                    // modalを開く
                    this.presentModal();
                  },
                  error => {
                    console.error(error);
                  }
                )
              }
            );
          }
        );
      }
    );
  }

  private makeblob(dataURL) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AthleteModalPage,
      componentProps: {}
    });
    return await modal.present();
  }

  onSettings = () => {
    this.router.navigate(['/setting']);
  }
}
