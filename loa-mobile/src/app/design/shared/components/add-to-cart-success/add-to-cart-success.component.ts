import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { GetDesignQuery } from "../../services";

@Component({
  selector: "app-add-to-cart-success",
  templateUrl: "./add-to-cart-success.component.html",
  styleUrls: ["./add-to-cart-success.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToCartSuccessComponent {
  @Input() design: GetDesignQuery["design"];
  constructor(private _modalCtrl: ModalController) {}

  close() {
    this._modalCtrl.dismiss();
  }
}
