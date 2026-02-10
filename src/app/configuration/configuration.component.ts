import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { selectCurrentSku, selectCurrentForm } from '../store/configuration/configuration.selectors';
import { resetForm, setCurrentSku, updateForm } from '../store/configuration/configuration.actions';
import { selectProductBySku } from '../store/catalog/catalog.selectors';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly submitted = signal(false);

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    notes: [''],
  });

  readonly currentSkuSig = this.store.selectSignal(selectCurrentSku);
  readonly productSig = signal<any>(null);

  constructor() {
    effect(() => {
      const sku = this.currentSkuSig();
      if (!sku) return;
      const saved = this.store.selectSignal(selectCurrentForm)();
      if (saved) {
        this.form.patchValue(saved, { emitEvent: false });
      } else {
        this.form.reset(
          { fullName: '', email: '', phone: '', quantity: 1, notes: '' },
          { emitEvent: false }
        );
      }
      const pSel = selectProductBySku(sku);
      this.productSig.set(this.store.selectSignal(pSel)());
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const sku = params.get('skuId');
      if (sku) {
        this.store.dispatch(setCurrentSku({ skuId: sku }));
      } else {
        const current = this.currentSkuSig();
        if (current) {
          this.router.navigate(['/configuration'], { queryParams: { skuId: current } });
        }
      }
    });

    this.form.valueChanges.subscribe((value) => {
      this.store.dispatch(updateForm({ changes: value }));
    });
  }

  submit(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;
  }

  clear(): void {
    this.store.dispatch(resetForm());
    this.form.reset({ fullName: '', email: '', phone: '', quantity: 1, notes: '' });
    this.submitted.set(false);
  }
}
