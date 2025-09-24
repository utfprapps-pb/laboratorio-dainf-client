import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class StatCardComponent implements OnChanges {
  @Input() title: string;
  @Input() value: number | string | null | undefined;
  @Input() icon: string; // ex: 'handshake', 'clock-o'
  @Input() accentColor = '#3B82F6';
  @Input() clickable = false;
  @Input() iconLibrary: 'pi' | 'fa' = 'fa'; // padrão agora Font Awesome
  @Output() cardClick = new EventEmitter<void>();

  private accentRgba = 'rgba(59,130,246,0.18)';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accentColor']) {
      this.updateAccentRgba();
    }
  }

  private updateAccentRgba() {
    this.accentRgba = this.hexToRgba(this.accentColor, 0.18);
  }

  private hexToRgba(hex: string, alpha: number): string {
    if (!hex) { return `rgba(0,0,0,${alpha})`; }
    let h = hex.trim();
    if (h.startsWith('rgba')) return h; if (h.startsWith('rgb')) return h.replace('rgb','rgba').replace(')',`,`+alpha+')');
    if (h.startsWith('#')) h = h.substring(1);
    if (h.length === 3) { h = h.split('').map(c=>c+c).join(''); }
    if (h.length !== 6) return `rgba(0,0,0,${alpha})`;
    const r = parseInt(h.slice(0,2),16); const g = parseInt(h.slice(2,4),16); const b = parseInt(h.slice(4,6),16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  get gradientStyle() {
    return {
      'border-left': '4px solid ' + this.accentColor,
      'background': `linear-gradient(135deg, ${this.accentRgba} 0%, rgba(255,255,255,0.92) 65%)`
    };
  }

  get safeValue() {
    return this.value === null || this.value === undefined || this.value === '' ? '-' : this.value;
  }

  get iconClasses() {
    return this.iconLibrary === 'pi' ? `pi pi-${this.icon}` : `fa fa-${this.icon}`;
  }

  onClick() {
    if (this.clickable) {
      this.cardClick.emit();
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.clickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.cardClick.emit();
    }
  }
}
