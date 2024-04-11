import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SubSinkable } from "@loa-shared/models";

@Component({
  selector: "app-my-construction-review",
  templateUrl: "./my-construction-review.component.html",
  styleUrls: ["./my-construction-review.component.scss"],
})
export class MyConstructionReviewComponent extends SubSinkable {
  backTo: string;
  constructor(public activatedRoute: ActivatedRoute, private _router: Router) {
    super();
    this._subSink.sink = activatedRoute.queryParams.subscribe(
      ({ backTo }) => (this.backTo = backTo)
    );
  }
  changePage(link) {
    this._router.navigate([link]);
  }
}
