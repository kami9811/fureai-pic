import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-athlete-modal',
  templateUrl: './athlete-modal.page.html',
  styleUrls: ['./athlete-modal.page.scss'],
})
export class AthleteModalPage implements OnInit {
  // Data passed in by componentProps
  // @Input() image_sns: any;
  name: string = localStorage.athlete_name;
  sport: string = localStorage.athlete_sport;
  episode: string = localStorage.athlete_episode;
  charm: string = localStorage.athlete_charm;
  wiki_url: string = localStorage.wiki_url;

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    let sentense: string = this.name + '選手。' + '小さい頃のエピソード。' + this.episode + this.sport + 'の面白さ。' + this.charm
    console.log(sentense);
    let u = new SpeechSynthesisUtterance(sentense);
    u.lang = "ja";
    speechSynthesis.speak(u);
  }

  read = () => {
    let sentense: string = this.name + '選手。' + '小さい頃のエピソード。' + this.episode + this.sport + 'の面白さ。' + this.charm
    console.log(sentense);
    let u = new SpeechSynthesisUtterance(sentense);
    u.lang = "ja";
    speechSynthesis.speak(u);
  }

  dismiss = () => {
    speechSynthesis.cancel();
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
