import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {
  @Input() title: string;
  @Input() display: string;
  @Output() isClicked = new EventEmitter();
  @Input() width: string;
  constructor() { }

  ngOnInit(): void {
  }

  clickHandler() {
    this.isClicked.emit();
  }
}
