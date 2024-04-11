import { Component, AfterViewInit, Input } from "@angular/core";

@Component({
  selector: "app-view-more-review",
  templateUrl: "./view-more-review.component.html",
  styleUrls: ["./view-more-review.component.scss"],
})
export class ViewMoreReviewComponent implements AfterViewInit {
  @Input() contentReview: string;

  contentLimit = "";
  isShowSeeMore = false;
  isNoShowMore = false;

  ngAfterViewInit(): void {
    if (this.contentReview.length > 240) {
      this.isShowSeeMore = true;
    } else {
      this.isNoShowMore = true;
    }
    this.contentLimit = this.contentReview.substring(0, 240);
  }

  expand() {
    this.isShowSeeMore = false;
  }
  collapse() {
    this.isShowSeeMore = true;
  }
}
