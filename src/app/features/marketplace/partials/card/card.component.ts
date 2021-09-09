import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

interface ICard {
  img: string;
  isNew: boolean;
  price: string;
  currency: string;
  title: string;
  subtitle: string;
}

const mockCard = {
  img: '/assets/img/mock-card.jpeg',
  isNew: true,
  price: '0,075',
  currency: 'DBZ',
  subtitle: 'Lonely Alien Space Club',
  title: 'Lonely Alien #4330'
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {

  @Input() card: ICard = mockCard;

  constructor() { }

  ngOnInit(): void { }

}
