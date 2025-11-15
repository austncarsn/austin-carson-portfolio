// Extend vitest's expect with jest-dom matchers, supporting default or named exports
import { expect } from 'vitest';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';

// jest-dom offers a top-level default export in some builds, or named exports in others.
const matchers = (jestDomMatchers as any).default ?? jestDomMatchers;
expect.extend(matchers);

// jsdom doesn't always include matchMedia; provide a minimal mock so tests that
// check prefers-reduced-motion don't fail.
if (typeof window !== 'undefined' && !('matchMedia' in window)) {
	// @ts-ignore - we'll stub a simple shape used by our hooks
	// @ts-ignore - we'll stub a simple shape used by our hooks
	window.matchMedia = (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: () => undefined,
		removeEventListener: () => undefined,
		addListener: () => undefined,
		removeListener: () => undefined,
	});
}

// Provide a basic IntersectionObserver stub so framer-motion / in-view usage
// in our components doesn't crash tests. This mimics the common patterns used
// in many test suites - observers simply call the callback immediately with
// an intersection entry (not a faithful implementation but enough for tests).
if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
	// @ts-ignore - we are stubbing the global for tests
	// @ts-ignore - we are stubbing the global for tests
	window.IntersectionObserver = class {
		callback: any;
		constructor(cb: any) {
			this.callback = cb;
		}
		observe(): void {
			// Immediately notify a single entry that isIntersecting === true
			this.callback([
				{
					isIntersecting: true,
					intersectionRatio: 1,
				},
			]);
		}
			unobserve(): void {
				return;
		}
			disconnect(): void {
				return;
		}
	} as any;
}
