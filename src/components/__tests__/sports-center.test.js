import React from 'react';
import { render, waitFor, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArticleList from '../Article/ArticlesList';
import { useArticlesDispatch, useArticlesState } from '../../context/Article/context';
import { usePreferencesDispatch } from '../../context/Preferences/context';


jest.mock('../../context/Article/context', () => ({
  useArticlesDispatch: jest.fn(),
  useArticlesState: jest.fn(),
}));

jest.mock('../../context/Preferences/context', () => ({
  usePreferencesDispatch: jest.fn(),
}));

jest.mock('../../context/Article/action', () => ({
  fetchArticles: jest.fn(),
}));

jest.mock('../../context/Preferences/action', () => ({
  fetchPreferencesList: jest.fn(),
}));

jest.mock('../Article/SportsList', () => () => <div>SportsList Component</div>);
jest.mock('../Preferences', () => () => <div>YourNews Component</div>);

describe('ArticleList', () => {
  let mockArticlesDispatch;
  let mockPreferencesDispatch;
  let mockOnArticleClick;

  beforeEach(() => {
    mockArticlesDispatch = jest.fn();
    mockPreferencesDispatch = jest.fn();
    mockOnArticleClick = jest.fn();

    useArticlesDispatch.mockReturnValue(mockArticlesDispatch);
    usePreferencesDispatch.mockReturnValue(mockPreferencesDispatch);
    useArticlesState.mockReturnValue({
      articles: [],
      isLoading: false,
      isError: false,
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('Renders correctly', () => {
    const { container } = render(<ArticleList onArticleClick={mockOnArticleClick} />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('Displays Loading State', () => {
    useArticlesState.mockReturnValue({
      articles: [],
      isLoading: true,
      isError: false,
    });

    const { getByText } = render(<ArticleList onArticleClick={mockOnArticleClick} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('Displays Error State', () => {
    useArticlesState.mockReturnValue({
      articles: [],
      isLoading: false,
      isError: true,
    });

    const { getByText } = render(<ArticleList onArticleClick={mockOnArticleClick} />);
    expect(getByText('Error fetching Articles')).toBeInTheDocument();
  });
});
