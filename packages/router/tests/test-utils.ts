import { vi } from 'vitest';

export function buildPageHtml(contentHtml: string, title: string): string {
  return `<!DOCTYPE html><html><head><title>${title}</title></head><body><div id="_content">${contentHtml}</div></body></html>`;
}

export function makeFetch(contentHtml = '<p>page-content</p>', title = 'Test Page') {
  return vi.fn().mockResolvedValue(
    new Response(buildPageHtml(contentHtml, title), {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    })
  );
}

export function clickAnchor(
  href: string,
  opts: Partial<MouseEventInit> = {},
  attrs: Record<string, string> = {}
): { event: MouseEvent; anchor: HTMLAnchorElement } {
  const a = document.createElement('a');
  a.href = href;
  for (const [k, v] of Object.entries(attrs)) a.setAttribute(k, v);
  document.body.appendChild(a);
  const event = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ...opts });
  a.dispatchEvent(event);
  a.remove();
  return { event, anchor: a };
}

export function flushMicrotasks(): Promise<void> {
  return new Promise((resolve) => queueMicrotask(resolve));
}

export function makeLocationValue(overrides: Partial<Location> = {}): Location {
  return {
    href: 'http://localhost/',
    origin: 'http://localhost',
    pathname: '/',
    search: '',
    hash: '',
    host: 'localhost',
    hostname: 'localhost',
    port: '',
    protocol: 'http:',
    assign: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    toString: () => 'http://localhost/',
    ancestorOrigins: [] as unknown as DOMStringList,
    ...overrides,
  };
}

export function createRouterTestBed(assignMock: ReturnType<typeof vi.fn>): {
  router: HTMLElement;
  content: HTMLDivElement;
  pushStateSpy: ReturnType<typeof vi.spyOn<History, 'pushState'>>;
} {
  assignMock.mockReset();
  vi.stubGlobal('fetch', makeFetch());
  vi.stubGlobal('scrollTo', vi.fn());
  const pushStateSpy = vi.spyOn(history, 'pushState').mockImplementation(() => { /* no-op */ });

  const content = document.createElement('div');
  content.id = '_content';
  content.innerHTML = '<p>initial</p>';
  document.body.appendChild(content);

  const router = document.createElement('ib-router');
  document.body.appendChild(router);

  return { router, content, pushStateSpy };
}

export function teardownRouterTestBed(router: HTMLElement, content: HTMLElement): void {
  router.remove();
  content.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
}

export function listenFor(target: EventTarget, eventName: string): CustomEvent[] {
  const events: CustomEvent[] = [];
  target.addEventListener(eventName, (e) => events.push(e as CustomEvent));
  return events;
}
