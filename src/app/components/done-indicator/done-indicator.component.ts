import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-done-indicator',
  templateUrl: './done-indicator.component.html',
  styleUrls: ['./done-indicator.component.scss']
})
export class DoneIndicatorComponent implements OnInit {
  showDone = false;
  constructor(private loading: LoadingService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.loading.getSpinnerObserver().subscribe((status) => {
      this.showDone = status === 'end';
      this.cdRef.detectChanges();
    });
  }

}
