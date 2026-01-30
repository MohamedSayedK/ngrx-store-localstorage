// A simple reactive signup form wired to NgRx and persisted via localStorage.
// Learning goals:
// - Build a standalone Angular component with reactive forms
// - Bind form changes to NgRx actions and state
// - Rehydrate persisted state on app reload without manual storage code
import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectSignupState } from '../store/signup/signup.selectors';
import { resetForm, setForm } from '../store/signup/signup.actions';
import { SignupState } from '../store/signup/signup.models';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  // Inject helpers:
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  // Track whether the user has attempted submit to show validation messages:
  readonly submitted = signal(false);

  // Build a strongly typed reactive form:
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    newsletter: [false],
  });

  constructor() {
    // Use an Angular signal effect to rehydrate the form when store state changes.
    // - store.selectSignal turns a selector into a signal.
    // - patchValue with { emitEvent: false } avoids creating feedback loops by
    //   not re-triggering valueChanges when we set form values from the store.
    effect(() => {
      const state = this.store.selectSignal(selectSignupState)();
      this.form.patchValue(state, { emitEvent: false });
    });
  }

  ngOnInit(): void {
    // As the user types, push partial form changes into the store.
    // ngrx-store-localstorage will persist those changes automatically.
    this.form.valueChanges.subscribe((value: Partial<SignupState>) => {
      this.store.dispatch(setForm({ changes: value }));
    });
  }

  submit(): void {
    // Show validation messages after first submit attempt:
    this.submitted.set(true);

    if (this.form.invalid) {
      return;
    }

    // Dispatch full form values. In a real app, you might call an effect to POST data.
    this.store.dispatch(setForm({ changes: this.form.getRawValue() }));
  }

  clear(): void {
    // Reset the form controls and clear persisted store state.
    this.form.reset({
      name: '',
      email: '',
      password: '',
      newsletter: false,
    });
    this.store.dispatch(resetForm());
    this.submitted.set(false);
  }
}
