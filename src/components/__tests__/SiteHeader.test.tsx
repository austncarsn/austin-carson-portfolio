import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SiteHeader } from '../SiteHeader';

describe('SiteHeader (nav indicator)', () => {
  it('desktop nav has HOME aria-current by default and changes on click', () => {
    render(<SiteHeader />);

  const homeLinks = screen.getAllByRole('link', { name: /home/i });
  const home = homeLinks.find((el) => el.closest('.nav-pill-track'));
  expect(home).toBeTruthy();
  expect(home?.getAttribute('aria-current')).toBe('page');

  const projectsCandidates = screen.getAllByRole('link', { name: /projects|projects/i });
  const projects = projectsCandidates.find((el) => el.closest('.nav-pill-track'))!;
    fireEvent.click(projects);
  expect(projects?.getAttribute('aria-current')).toBe('page');
  expect(home?.hasAttribute('aria-current')).toBe(false);
  });

  it('hovering nav item sets hover variables on track', async () => {
    render(<SiteHeader />);

  const projectsCandidates = screen.getAllByRole('link', { name: /projects|projects/i });
  const projects = projectsCandidates.find((el) => el.closest('.nav-pill-track'));
    const track = document.querySelector('.nav-pill-track') as HTMLElement | null;
    expect(track).not.toBeNull();
    // initial hover var is empty or 0
    expect(track!.style.getPropertyValue('--nav-ind-hover-width')).toBe('');

    // Simulate hover (fireEvent.mouseEnter triggers onMouseEnter)
  expect(projects).toBeTruthy();
  const projEl = projects as HTMLElement;
  fireEvent.mouseEnter(projEl);


  // The hover indicator visible flag should be set by setHoverIndicator logic
  const visible = track!.style.getPropertyValue('--nav-ind-hover-visible');
  expect(visible).toBe('1');

    // Clean up by leaving
  fireEvent.mouseLeave(projEl);
  expect(track!.style.getPropertyValue('--nav-ind-hover-visible')).toBe('0');
  });
});
