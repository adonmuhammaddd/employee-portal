import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRupiahMask]'
})
export class RupiahMaskDirective {

  constructor(private el: ElementRef<HTMLInputElement>, private renderer: Renderer2) { }

  ngOnInit() {
    this.el.nativeElement.value = 'Rp. ';
  }

  @HostListener('input', ['$event']) onInput(event: InputEvent) {
    const value = this.el.nativeElement.value;
    const cleanValue = value.replace(/\D/g, '');
    const formattedValue = this.formatToRupiah(cleanValue);

    this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
  }

  private formatToRupiah(value: string): string {
    const parts = value.split('');
    let formattedValue = '';

    while (parts.length > 3) {
      const chunk = parts.splice(-3).join('');
      formattedValue = '.' + chunk + formattedValue;
    }
    formattedValue = parts.join('') + formattedValue;

    return 'Rp. ' + formattedValue;
  }

}
