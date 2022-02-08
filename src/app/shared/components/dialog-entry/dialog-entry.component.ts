import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  template: '',
})
export class DialogEntryComponent implements OnDestroy {
  private dialogRef: MatDialogRef<DialogEntryComponent>;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    const {component} = route.snapshot.data;
    if (component) {
      this.dialogRef = this.dialog.open(component);
    }
  }

  ngOnDestroy(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
