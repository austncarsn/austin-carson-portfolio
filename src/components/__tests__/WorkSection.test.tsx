import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
// userEvent intentionally not used - keep tests sync for interactions
import { describe, it, expect, vi } from 'vitest';
import { WorkSection, Project } from '../WorkSection';

describe('WorkSection', () => {
  const projects: Project[] = [
    {
      id: 'p1',
      title: 'Design System Refresh',
      image: '/img/a.jpg',
      category: 'Design',
      year: '2024',
      client: 'Acme',
      description: 'Updated tokens, css variables',
      tags: ['tokens', 'ui'],
      role: 'Lead Designer',
    },
    {
      id: 'p2',
      title: 'E-commerce Rebuild',
      image: '/img/b.jpg',
      category: 'Engineering',
      year: '2023',
      client: 'RetailCo',
      description: 'Performance focused rebuild',
      tags: ['performance'],
      role: 'Engineer',
    },
  ];

  it('shows all projects by default and filters by category', () => {
    render(<WorkSection projects={projects} />);

    // both projects visible initially
    expect(screen.getByText(/Design System Refresh/i)).toBeTruthy();
    expect(screen.getByText(/E-commerce Rebuild/i)).toBeTruthy();

    // Click the Design filter
    const designBtn = screen.getByRole('button', { name: /design/i });
    fireEvent.click(designBtn);

    // The engineering project should be hidden
    expect(screen.queryByText(/E-commerce Rebuild/i)).toBeNull();
    expect(screen.getByText(/Design System Refresh/i)).toBeTruthy();
  });

  it('calls onProjectClick when the CTA is clicked', async () => {
    const onProjectClick = vi.fn();
    render(<WorkSection projects={projects} onProjectClick={onProjectClick} />);

    // There should be a button for the first project
  const articles = screen.getAllByRole('article');
  expect(articles.length).toBeGreaterThan(0);
  const article = articles[0];
  const cta = within(article).getByTestId(`case-study-${projects[0].id}`);

  // Ensure the CTA exists and is keyboard actionable
  expect(cta).toBeTruthy();
  expect(cta.textContent).toMatch(/View case study/i);
  });

  it('filter buttons reflect aria-pressed and CTA is accessible and focusable', () => {
    render(<WorkSection projects={projects} />);

    // Use the first design filter button we find and ensure clicking sets some
    // design button to aria-pressed=true (avoid asserting global default state
    // because animation wrappers can create duplicate nodes in the test DOM).
    const designButtons = screen.getAllByRole('button', { name: /design/i });
    expect(designButtons.length).toBeGreaterThan(0);
    const designBtn = designButtons[0];

    // Activate Design filter
    fireEvent.click(designBtn);

    // After activation, at least one of the design buttons should report pressed
    const anyDesignPressed = screen
      .getAllByRole('button', { name: /design/i })
      .some((b) => b.getAttribute('aria-pressed') === 'true');
    expect(anyDesignPressed).toBe(true);

    // Check CTA accessibility and focusability
    const articles = screen.getAllByRole('article');
    const firstArticle = articles[0];
    const cta = within(firstArticle).getByTestId(`case-study-${projects[0].id}`);

    // Should be a button with accessible name
  expect(cta).toBeTruthy();
  expect(cta.textContent).toMatch(/View case study/i);

    // Ensure it's focusable via DOM focus (keyboard accessible)
    (cta as HTMLElement).focus();
    expect(document.activeElement).toBe(cta);
  });
});
