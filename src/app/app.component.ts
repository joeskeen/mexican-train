import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl
} from '@angular/forms';
import {
  StorageMap
} from '@ngx-pwa/local-storage';
import {
  HcToasterService
} from '@healthcatalyst/cashmere';
import {
  first,
  map
} from 'rxjs/operators';
import {
  Domino
} from './domino/domino';
import {
  findIdealTrain,
  score
} from './train';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dominoes: Domino[] = [];
  organized: Domino[] = [];
  unorganized: Domino[] = [];
  score = 0;
  readonly headControl = new FormControl();

  constructor(private storageMap: StorageMap, private toasterService: HcToasterService) {}

  async ngOnInit() {
    this.dominoes = [];
    const savedDominoes: Domino[] = await this.storageMap.get('dominoes').pipe(first(), map(x => x as any as Domino[])).toPromise();
    if (savedDominoes) {
      this.dominoes = [...savedDominoes];
      this.unorganized = [...savedDominoes];
      this.organized = [];
      this.score = score(savedDominoes);
    }
  }

  remove(domino: Domino) {
    if (this.organized.includes(domino)) {
      this.organized = [];
      this.unorganized = [...this.dominoes];
    }
    this.dominoes = this.dominoes.filter(d => d !== domino);
    this.unorganized = this.unorganized.filter(d => d !== domino);
    this.score = score(this.dominoes);
    this.save();
  }

  newDomino() {
    const newDomino = {
      left: null,
      right: null
    };
    this.dominoes.push(newDomino);
    this.unorganized.push(newDomino);
    this.save();
  }

  async save() {
    this.score = score(this.dominoes);
    await this.storageMap.set('dominoes', this.dominoes).pipe(first()).toPromise();
  }

  organize() {
    this.organized = findIdealTrain(+this.headControl.value, this.dominoes);
    this.unorganized = this.dominoes.filter(d => !this.organized.includes(d));
  }

  clear() {
    this.dominoes = [];
    this.organized = [];
    this.unorganized = [];
    this.headControl.patchValue(null);
    this.save();
  }
}