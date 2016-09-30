import { Component, Input, OnInit, forwardRef, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-select-icon',
  templateUrl: './select-icon.component.html',
  styleUrls: ['./select-icon.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectIconComponent),
      multi: true
    }
  ]
})
export class SelectIconComponent implements OnInit, ControlValueAccessor {

  @Input() family: string;

  dialogRef: MdDialogRef<IconDialogComponent>;

  private value;
  private propagateChange = (_: any) => { };

  constructor(public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  open() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(IconDialogComponent, config);

    this.dialogRef.componentInstance.family = this.family;

    this.dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.value = result;
        this.propagateChange(this.value);
        this.dialogRef = null;
      }
    });
  }
}


@Component({
  selector: 'app-icon-dialog',
  styles: ['img { cursor: pointer; }'],
  template: `
  <img *ngFor="let icon of icons | async" src="/assets/icons/{{family}}/{{icon}}.png" (click)="dialogRef.close(icon)">
  `
})
export class IconDialogComponent implements OnInit {

  public family;

  private icons: Observable<string[]>;

  constructor(public dialogRef: MdDialogRef<IconDialogComponent>, public http: Http) { }

  ngOnInit() {
    this.icons = this.http.get('/assets/icons/' + this.family + '/list.json').map(res => res.json());
  }
}