import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

const MockCards = [
  {
    img: '/assets/img/mock-card-1.jpg',
    isNew: true,
    price: '0,075',
    currency: 'DBZ',
    subtitle: 'Lonely Alien Space Club',
    title: 'Lonely Alien #4330'
  }, {
    img: '/assets/img/mock-card-2.jpg',
    isNew: true,
    price: '0,075',
    currency: 'DBZ',
    subtitle: 'Lonely Alien Space Club',
    title: 'Lonely Alien #4331'
  }, {
    img: '/assets/img/mock-card-3.jpg',
    isNew: true,
    price: '0,075',
    currency: 'DBZ',
    subtitle: 'Lonely Alien Space Club',
    title: 'Lonely Alien #4332'
  }, {
    img: '/assets/img/mock-card-4.jpg',
    isNew: true,
    price: '0,075',
    currency: 'DBZ',
    subtitle: 'Lonely Alien Space Club',
    title: 'Lonely Alien #4333'
  }, {
    img: '/assets/img/mock-card-5.jpg',
    isNew: true,
    price: '0,075',
    currency: 'DBZ',
    subtitle: 'Lonely Alien Space Club',
    title: 'Lonely Alien #4334'
  }, {
    img: '/assets/img/mock-card-6.jpg',
    isNew: true,
    price: '0,075',
    currency: 'DBZ',
    subtitle: 'Lonely Alien Space Club',
    title: 'Lonely Alien #4330'
  }, {
    img: '/assets/img/mock-card-7.jpg',
    isNew: true,
    price: '0,075',
    currency: 'DBZ',
    subtitle: 'Lonely Alien Space Club',
    title: 'Lonely Alien #4335'
  }, {
    img: '/assets/img/mock-card-8.jpg',
    isNew: true,
    price: '0,075',
    currency: 'DBZ',
    subtitle: 'Lonely Alien Space Club',
    title: 'Lonely Alien #4336'
  }, {
    img: '/assets/img/mock-card-9.jpg',
    isNew: true,
    price: '0,075',
    currency: 'DBZ',
    subtitle: 'Lonely Alien Space Club',
    title: 'Lonely Alien #4337'
  }, {
    img: '/assets/img/mock-card-10.jpg',
    isNew: true,
    price: '0,075',
    currency: 'DBZ',
    subtitle: 'Lonely Alien Space Club',
    title: 'Lonely Alien #4338'
  }
];

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuyNowComponent implements OnInit {

  public cards = MockCards;

  constructor() { }

  ngOnInit(): void { }

}
