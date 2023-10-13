import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProblemService } from 'src/app/service/problem.service';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss'],
})
export class ProblemComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;

  selectedPane: number = 0;
  bottomCardIsOpen: boolean = true;

  verticalSeparatorIsHandling = false;
  @ViewChild('left') left!: ElementRef;
  @ViewChild('right') right!: ElementRef;
  @ViewChild('vseparator') verticalSeparator!: ElementRef;

  horizontalSeparatorIsHandling = false;
  @ViewChild('top') top!: ElementRef;
  @ViewChild('bottom') bottom!: ElementRef;
  @ViewChild('hseparator') horizontalSeparator!: ElementRef;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly problemService: ProblemService,
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.problemService.getProblem(params['problem-id']);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  toggleBottomCard() {
    if (this.bottomCardIsOpen) {
      (this.top.nativeElement as HTMLElement).style.height = `calc(93% - 4px)`;
      (this.bottom.nativeElement as HTMLElement).style.height = `calc(7% - 4px)`;
    } else {
      (this.top.nativeElement as HTMLElement).style.height = `calc(60% - 4px)`;
      (this.bottom.nativeElement as HTMLElement).style.height = `calc(40% - 4px)`;
    }
    this.bottomCardIsOpen = !this.bottomCardIsOpen;
  }

  onMouseDownVertical() {
    this.verticalSeparatorIsHandling = true;
  }

  onMouseDownHorizontal() {
    this.horizontalSeparatorIsHandling = true;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.verticalSeparatorIsHandling = false;
    this.horizontalSeparatorIsHandling = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: Event) {
    if (this.verticalSeparatorIsHandling) {
      // Get the width of the elements
      const leftWidth = (this.left.nativeElement as HTMLElement).offsetWidth;
      const rightWidth = (this.right.nativeElement as HTMLElement).offsetWidth;
      const separatorWidth = (this.verticalSeparator.nativeElement as HTMLElement).offsetWidth;
      const totalWidth = leftWidth + rightWidth + separatorWidth;
      // Calculate the mouse position in %
      const mouseX = (event as MouseEvent).clientX - 10;
      const leftWidthPercentageNew = (mouseX / totalWidth) * 100;
      const rightWidthPercentageNew = 100 - leftWidthPercentageNew;
      // Set the width of the left and right elements in % if they are greater than 400px and 300px respectively
      if ((totalWidth * leftWidthPercentageNew) / 100 > 400 && (totalWidth * rightWidthPercentageNew) / 100 > 300) {
        (this.left.nativeElement as HTMLElement).style.width = `calc(${leftWidthPercentageNew}% - 4px)`;
        (this.right.nativeElement as HTMLElement).style.width = `calc(${rightWidthPercentageNew}% - 4px)`;
      }
    }

    if (this.horizontalSeparatorIsHandling) {
      // Get the height of the elements
      const topHeight = (this.top.nativeElement as HTMLElement).offsetHeight;
      const bottomHeight = (this.bottom.nativeElement as HTMLElement).offsetHeight;
      const separatorHeight = (this.horizontalSeparator.nativeElement as HTMLElement).offsetHeight;
      const totalHeight = topHeight + bottomHeight + separatorHeight;
      // Calculate the mouse position in %
      const mouseY = (event as MouseEvent).clientY - 73;
      const topHeightPercentageNew = (mouseY / totalHeight) * 100;
      const bottomHeightPercentageNew = 100 - topHeightPercentageNew;
      // Set the height of the top and bottom elements in % if they are greater than 200px and 37.8px respectively
      if (
        (totalHeight * topHeightPercentageNew) / 100 > 200 &&
        (totalHeight * bottomHeightPercentageNew) / 100 > 37.8
      ) {
        (this.top.nativeElement as HTMLElement).style.height = `calc(${topHeightPercentageNew}% - 4px)`;
        (this.bottom.nativeElement as HTMLElement).style.height = `calc(${bottomHeightPercentageNew}% - 4px)`;
        if (bottomHeightPercentageNew <= 7) {
          this.bottomCardIsOpen = false;
        } else {
          this.bottomCardIsOpen = true;
        }
      }
    }
  }
}
