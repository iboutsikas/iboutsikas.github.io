import { LitElement, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit/decorators.js';
import {
  RouterEvents,
  type RouterBeforeNavigateDetail,
  type RouterNavigatedDetail,
  type RouterNavigationCompleteDetail,
  type RouterNavigationErrorDetail,
} from './types/events.js';

const SUPPORTS_VT = typeof document.startViewTransition === 'function';

function isSameOrigin(url: string): boolean {
  try {
    return new URL(url, location.href).origin === location.origin;
  } catch {
    return false;
  }
}

function isSamePage(url: string): boolean {
  const t = new URL(url, location.href);
  return t.pathname === location.pathname && t.search === location.search;
}

@customElement('ib-router')
export class IbRouter extends LitElement {
  /** Element whose innerHTML gets swapped. */
  @property({ type: String }) accessor contentSelector = '#_content';

  /** Class added to content element before swap. */
  @property({ type: String }) accessor leavingClass = 'router-leaving';

  /** Class added to content element after swap. */
  @property({ type: String }) accessor enteringClass = 'router-entering';

  private _controller: AbortController | null = null;

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleClick);
    window.addEventListener('popstate', this._handlePopstate);
  }

  override disconnectedCallback() {
    this._disconnect();
    super.disconnectedCallback();
  }

  private _disconnect() {
    document.removeEventListener('click', this._handleClick);
    window.removeEventListener('popstate', this._handlePopstate);
    if (this._controller) {
      this._controller.abort();
      this._controller = null;
    }
  }

  private async _navigate(
    url: string,
    {
      pushState = true,
      isBackForward = false,
    }: { pushState?: boolean; isBackForward?: boolean } = {}
  ): Promise<void> {
    if (this._controller) {
      this._controller.abort();
    }

    const from = location.pathname;

    if (isSamePage(url)) {
      const title = document.title;
      const prevented = this._beforeNavigate(url, title);
      if (prevented) {
        location.assign(url);
        return;
      }
      if (pushState) {
        history.pushState({ spa: true }, title, url);
      }
      this._dispatchNavigated(url, title, from, isBackForward);
      this._dispatchNavigationComplete(url, title, from, isBackForward);
      return;
    }

    this._controller = new AbortController();
    const signal = this._controller.signal;

    try {
      const { html, title } = await this._fetchPage(url, signal);
      const content = this._getContent();
      if (!content) return;

      if (SUPPORTS_VT) {
        const prevented = this._beforeNavigate(url, title);
        if (prevented) {
          location.assign(url);
          return;
        }
        const transition = document.startViewTransition(() => {
          this._applySwap(url, html, title, pushState);
          this._dispatchNavigated(url, title, from, isBackForward);
        });
        await transition.finished.catch(() => {
          // noop
        });
        this._dispatchNavigationComplete(url, title, from, isBackForward);
      } else {
        const prevented = this._beforeNavigate(url, title);
        if (prevented) {
          location.assign(url);
          return;
        }
        await this._markLeaving(content);
        this._applySwap(url, html, title, pushState);
        this._dispatchNavigated(url, title, from, isBackForward);
        await this._markEntering(content);
        this._dispatchNavigationComplete(url, title, from, isBackForward);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      this._dispatchNavigationError(url, err);
      location.assign(url);
    } finally {
      this._controller = null;
    }
  }

  private _getContent(): HTMLElement | null {
    const selector = this.contentSelector;
    return document.querySelector<HTMLElement>(selector);
  }

  private async _fetchPage(
    url: string,
    signal: AbortSignal
  ): Promise<{ html: string; title: string }> {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return {
      html: doc.querySelector('#_content')?.innerHTML ?? '',
      title: doc.title,
    };
  }

  private _applySwap(url: string, html: string, title: string, pushState: boolean): void {
    const content = this._getContent();
    if (!content) return;

    content.innerHTML = html;
    document.title = title;
    if (pushState) {
      history.pushState({ spa: true }, title, url);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  private _beforeNavigate(url: string, title: string): boolean {
    const detail: RouterBeforeNavigateDetail = { url, title, defaultPrevented: false };
    const event = new CustomEvent(RouterEvents.BeforeNavigate, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
    detail.defaultPrevented = event.defaultPrevented;
    return event.defaultPrevented;
  }

  private _dispatchNavigated(
    url: string,
    title: string,
    from: string,
    isBackForward: boolean
  ): void {
    const detail: RouterNavigatedDetail = { url, title, from, isBackForward };
    this.dispatchEvent(
      new CustomEvent(RouterEvents.Navigated, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private _dispatchNavigationComplete(
    url: string,
    title: string,
    from: string,
    isBackForward: boolean
  ): void {
    const detail: RouterNavigationCompleteDetail = { url, title, from, isBackForward };
    queueMicrotask(() => {
      this.dispatchEvent(
        new CustomEvent(RouterEvents.NavigationComplete, {
          detail,
          bubbles: true,
          composed: true,
        })
      );
    });
  }

  private _dispatchNavigationError(url: string, error: unknown): void {
    const detail: RouterNavigationErrorDetail = {
      url,
      error: error instanceof Error ? error : new Error(String(error)),
    };
    queueMicrotask(() => {
      this.dispatchEvent(
        new CustomEvent(RouterEvents.NavigationError, {
          detail,
          bubbles: true,
          composed: true,
        })
      );
    });
  }

  private _handleClick = (e: MouseEvent): void => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;

    const target = e.target;
    if (!(target instanceof Node)) return;
    const a = (target as Element).closest('a');
    if (!a || !a.href) return;
    if (a.target === '_blank') return;
    if (a.hasAttribute('download')) return;
    if (a.getAttribute('rel')?.includes('external')) return;
    if (!isSameOrigin(a.href)) return;

    e.preventDefault();
    void this._navigate(a.href);
  };

  private _handlePopstate = (): void => {
    void this._navigate(location.href, { pushState: false, isBackForward: true });
  };

  private async _markLeaving(el: HTMLElement): Promise<void> {
    el.classList.add(this.leavingClass);
    return new Promise<void>((resolve) => {
      const timer = setTimeout(resolve, 1000);
      el.addEventListener(
        'transitionend',
        () => {
          clearTimeout(timer);
          resolve();
        },
        { once: true }
      );
    });
  }

  private async _markEntering(el: HTMLElement): Promise<void> {
    el.classList.remove(this.leavingClass);
    el.classList.add(this.enteringClass);
    await new Promise<void>((resolve) => {
      const timer = setTimeout(resolve, 1000);
      el.addEventListener(
        'transitionend',
        () => {
          clearTimeout(timer);
          resolve();
        },
        { once: true }
      );
    });
    el.classList.remove(this.enteringClass);
  }

  override createRenderRoot() {
    return this;
  }

  override render() {
    return nothing;
  }
}
