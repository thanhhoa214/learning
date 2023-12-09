import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  item;

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.params.id;
    this.item = id;
    console.log(id);
  }
}
