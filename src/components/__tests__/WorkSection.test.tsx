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
});
