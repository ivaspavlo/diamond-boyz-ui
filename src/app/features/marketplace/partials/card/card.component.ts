import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';


interface ICard {
  img: string;
  isNew: boolean;
  price: string;
  currency: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {

  @Input() card: ICard;  

  constructor() { }

  ngOnInit(): void { }

}
