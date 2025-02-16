import {Component} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {NgForOf, NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {EventService} from "../../../services/event.service";
import {EventEditService} from "../../../services/event-edit.service";
import {NotificationService} from "../../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-prices',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    NgForOf,
    MatInput,
    MatLabel,
    MatError,
    NgIf,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './edit-prices.component.html',
  styleUrl: './edit-prices.component.scss'
})
export class EditPricesComponent {
  form: FormGroup;
  pricesPerCategory: any[] = [];
  eventId: number = 0;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPricesComponent>,
    private eventService: EventService,
    private eventEditService: EventEditService,
    private notificationService: NotificationService, private router: Router
  ) {
    this.form = this.fb.group({
      items: this.fb.array([])
    });
    this.eventEditService.getMessage.subscribe(data => {
      this.eventId = data.id;
      this.setItems(data.categories);
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  setItems(data: any[]): void {
    data.forEach(item => {
      this.items.push(this.fb.group({
        id: [item.id || null],
        name: [item.name, Validators.required],
        price: [item.price || '', [Validators.required, Validators.min(0)]]
      }));
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      let seated = false;
      let seatedPrices: { [key: number]: number } = {};
      let standingPrices: { [key: string]: number } = {};

      const result = this.items.value;
      for (let r of result) {
        if (r.id) {
          seated = true;
          seatedPrices[r.id] = r.price;
        } else {
          standingPrices[r.name] = r.price;
        }
      }

      if (seated) {
        this.eventService.updateSeatedPrices(this.eventId, JSON.stringify(seatedPrices)).subscribe({
          next: () => {
            this.dialogRef.close(this.form.value);
            this.notificationService.showSuccess('The prices were updated successfully!');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          error: err => {
            let message = typeof err.error === "string" ? err.error : 'Internal server error';
            let status = typeof err.status === "number" ? err.status : 500;

            if (status === 401 || status === 403) {
              this.dialogRef.close();
              this.router.navigate(['/events/all']);
            } else if (400 <= status && status < 500) {
              this.notificationService.showWarning(message);
            } else {
              this.notificationService.showError(message);
            }
          }
        });
      } else {
        this.eventService.updateStandingPrices(this.eventId, JSON.stringify(standingPrices)).subscribe({
          next: () => {
            this.dialogRef.close(this.form.value);
            this.notificationService.showSuccess('The prices were updated successfully!');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          error: err => {
            let message = typeof err.error === "string" ? err.error : 'Internal server error';
            let status = typeof err.status === "number" ? err.status : 500;

            if (status === 401 || status === 403) {
              this.dialogRef.close();
              this.router.navigate(['/events/all']);
            } else if (400 <= status && status < 500) {
              this.notificationService.showWarning(message);
            } else {
              this.notificationService.showError(message);
            }
          }
        });
      }

      this.dialogRef.close(result);
    }
  }
}
