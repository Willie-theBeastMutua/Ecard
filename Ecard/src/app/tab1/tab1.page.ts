import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class Tab1Page implements OnInit {
  vCardData: string = ""
  constructor() { }
  ngOnInit() {
  }
  ngAfterViewInit(){
    let Fname = "Wilson",
    lname = "mutua",
    org = "MacMI Safaris",
    url = "www.macmi.co.ke",
    email = "wilson@macmi.co.ke",
    tel = "0792718714"

    this.vCardData= `BEGIN:VCARD
version:3.0
N:${Fname} ${lname}
FN:${Fname} ${lname}
ORG:${org}
URL:${url}
EMAIL:${email}
TEL;TYPE=voce, work, pref:${tel}
END:VCARD
`


  }
  flip: string = 'inactive';

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

}
