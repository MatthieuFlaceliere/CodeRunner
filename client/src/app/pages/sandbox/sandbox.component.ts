import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent {
  separatorIsHandling = false;
  @ViewChild('left') left!: ElementRef;
  @ViewChild('right') right!: ElementRef;
  @ViewChild('separator') separator!: ElementRef;

  onMouseDown() {
    this.separatorIsHandling = true;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.separatorIsHandling = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: Event) {
    if (this.separatorIsHandling) {
      // Get the width of the elements
      const leftWidth = (this.left.nativeElement as HTMLElement).offsetWidth;
      const rightWidth = (this.right.nativeElement as HTMLElement).offsetWidth;
      const separatorWidth = (this.separator.nativeElement as HTMLElement).offsetWidth;
      const totalWidth = leftWidth + rightWidth + separatorWidth;
      // Calculate the mouse position in %
      const mouseX = (event as MouseEvent).clientX;
      const leftWidthPercentageNew = (mouseX / totalWidth) * 100;
      const rightWidthPercentageNew = 100 - leftWidthPercentageNew;
      // Set the width of the left and right elements in % if they are greater than 400px and 300px respectively
      if ((totalWidth * leftWidthPercentageNew) / 100 > 400 && (totalWidth * rightWidthPercentageNew) / 100 > 300) {
        (this.left.nativeElement as HTMLElement).style.width = `calc(${leftWidthPercentageNew}% - 4px)`;
        (this.right.nativeElement as HTMLElement).style.width = `calc(${rightWidthPercentageNew}% - 4px)`;
      }
    }
  }
}
