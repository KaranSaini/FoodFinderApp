import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  showLoading = false;
  constructor(private loading: LoadingService, private cdRef: ChangeDetectorRef) { 
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.loading.getSpinnerObserver().subscribe((status) => {
      this.showLoading = status === 'start';
      this.cdRef.detectChanges();
    });
  }
}
