import { Observable, map } from 'rxjs';

/**
 * Utility to observe the size of an element using ResizeObserver.
 * @param element The element to observe.
 * @returns An observable that emits the element's width and height.
 */
export function observeSize(element: HTMLElement): Observable<{ width: number; height: number }> {
  return new Observable<{ width: number; height: number }>(subscriber => {
    // Emit current size synchronously so combinators like combineLatest work immediately.
    subscriber.next({ width: element.offsetWidth, height: element.offsetHeight });

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        subscriber.next({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    observer.observe(element);
    subscriber.add(() => observer.disconnect());
  });
}

/**
 * Utility to observe the width of an element using ResizeObserver.
 * @param element The element to observe.
 * @returns An observable that emits the element's width.
 */
export function observeWidth(element: HTMLElement): Observable<number> {
  return observeSize(element).pipe(map(size => size.width));
}
