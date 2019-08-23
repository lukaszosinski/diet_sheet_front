import { Component, OnInit } from '@angular/core';
import { AppInitializeService } from './services/app-initialize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
  constructor(private initializeService: AppInitializeService) { }

  ngOnInit(): void {
    this.initializeService.initialize();
  }
}
