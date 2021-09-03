import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  id: string;
  email: string;
  attribute: Number;
  constraint: Boolean;
  password: string;

  postObj: any = {};
  returnObj: any = {};

  constructor(
    private alertController: AlertController,
    private router: Router,
    public httpService: HttpService
  ) { }

  ngOnInit() {
  }

  async alertSuccess() {
    const alert = await this.alertController.create({
      header: '新規登録',
      message: '新規登録に成功しました.',
      buttons: ['OK']
    })

    await alert.present();
  }
  async alertFailer() {
    const alert = await this.alertController.create({
      header: '新規登録',
      message: '新規登録に失敗しました.<br>IDが重複しています.',
      buttons: ['OK']
    })

    await alert.present();
  }

  signup = () => {
    this.postObj['user_id'] = this.id;
    this.postObj['email'] = this.email;
    this.postObj['constraint'] = this.constraint;
    this.postObj['password'] = this.password;
    const body = this.postObj;
    const url = environment.api + 'signup';

    this.httpService.http(url, body).subscribe(
      res => {
        this.returnObj = res;
        
        this.alertSuccess();
        this.router.navigate(['/login']);
      },
      error => {
        console.error(error)
        this.alertFailer();
      }
    )
  }

}
