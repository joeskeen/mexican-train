import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterContentInit
} from '@angular/core';
import {
  FormControl,
  Validators
} from '@angular/forms';
import {
  filter
} from 'rxjs/operators';
import {
  HcPopoverAnchorDirective
} from '@healthcatalyst/cashmere';
import {
  Domino
} from './domino';

@Component({
  selector: 'app-domino',
  templateUrl: './domino.component.html',
  styleUrls: ['./domino.component.scss']
})
export class DominoComponent implements OnInit, AfterContentInit {
  private _domino: Domino;
  @Input()
  get domino(): Domino {
    return this._domino;
  }
  set domino(value: Domino) {
    this._domino = value;
    this.sync();
  }

  @Output()
  readonly deleted = new EventEmitter();
  @Output()
  readonly changed = new EventEmitter();

  @ViewChild(HcPopoverAnchorDirective, {
    static: true
  })
  dominoMenu: HcPopoverAnchorDirective;

  readonly leftControl = new FormControl(null, [Validators.required, Validators.min(0), Validators.max(15), Validators.pattern(/^\d*$/)]);
  readonly rightControl = new FormControl(null, [Validators.required, Validators.min(0), Validators.max(15), Validators.pattern(/^\d*$/)]);

  private initialized = false;

  constructor() {}

  ngOnInit(): void {
    this.leftControl.valueChanges.pipe(
      filter(() => !!this.domino && this.leftControl.valid)
    ).subscribe(val => {
        this.domino.left = val;
        this.changed.emit();
      });
    this.rightControl.valueChanges.pipe(
      filter(() => !!this.domino && this.rightControl.valid)
    ).subscribe(val => {
        this.domino.right = val;
        this.changed.emit();
      });
  }

  ngAfterContentInit() {
    this.initialized = true;
    this.sync();
  }

  flip() {
    const swap = this.domino.left;
    this.domino.left = this.domino.right;
    this.domino.right = swap;
    this.sync();
    this.changed.emit();
  }

  remove() {
    this.deleted.emit();
  }

  private sync() {
    this.leftControl.patchValue(this.domino?.left);
    this.rightControl.patchValue(this.domino?.right);

    if (!this.initialized) return;

    if (!this.domino || this.domino.left === null || this.domino.right === null) {
      setTimeout(() => {
        this.dominoMenu.openPopover();
      });
    }
  }
}