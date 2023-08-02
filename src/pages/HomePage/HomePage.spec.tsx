import { HomePage } from '.';
import { render } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { useHomePage } from './useHomePage.ts';
import { photosMock } from '../../tests/factories/photosMocks.ts';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

vi.mock('./useHomePage');

describe('HomePage', () => {
  const useHomePageMock = useHomePage as Mock;

  beforeEach(() => {
    useHomePageMock.mockReturnValue({});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render', () => {
    const wrapper = render(<HomePage />);

    expect(wrapper.getByText('Type album number:')).toBeInTheDocument();
  });

  it('should render search input if albumId exists', () => {
    useHomePageMock.mockReturnValue({
      albumId: '12',
    });

    const wrapper = render(<HomePage />);

    expect(
      wrapper.getByText('Type photo title to search:'),
    ).toBeInTheDocument();
  });

  it('should render loader if isLoading', () => {
    useHomePageMock.mockReturnValue({
      isLoading: true,
    });

    const wrapper = render(<HomePage />);

    expect(wrapper.getByTestId('mui-loader')).toBeInTheDocument();
  });

  it('should render error information if isError', () => {
    useHomePageMock.mockReturnValue({
      isError: true,
    });

    const wrapper = render(<HomePage />);

    expect(wrapper.getByText('Unknown error!')).toBeInTheDocument();
  });

  it('should render pagination if isPagination is true', () => {
    useHomePageMock.mockReturnValue({
      isPagination: true,
    });

    const wrapper = render(<HomePage />);

    expect(wrapper.getByTestId('pagination')).toBeInTheDocument();
  });

  it('should render PhotosList properly', () => {
    useHomePageMock.mockReturnValue({
      photos: photosMock(4),
      isLoading: false,
      isError: false,
      albumId: 1,
    });

    const wrapper = render(
      <MemoryRouter initialEntries={['/album/2']}>
        <HomePage />
      </MemoryRouter>,
    );

    expect(wrapper.getByText('Awesome Photo 0')).toBeInTheDocument();
    expect(wrapper.getByText('Awesome Photo 1')).toBeInTheDocument();
    expect(wrapper.getByText('Awesome Photo 2')).toBeInTheDocument();
    expect(wrapper.getByText('Awesome Photo 3')).toBeInTheDocument();
  });

  it('should render PhotoDetailsModal', () => {
    useHomePageMock.mockReturnValue({
      photos: photosMock(4),
      isLoading: false,
      isError: false,
      photoId: 1,
    });

    const wrapper = render(
      <MemoryRouter initialEntries={['/album/1/photo/1']}>
        <HomePage />
      </MemoryRouter>,
    );

    expect(wrapper.getByText('AlbumId: 1')).toBeInTheDocument();
  });

  it('should render PhotoDetailsModal on more details click', () => {
    useHomePageMock.mockReturnValue({
      photos: photosMock(4),
      isLoading: false,
      isError: false,
      photoId: 1,
      albumId: 1,
    });

    const wrapper = render(
      <MemoryRouter initialEntries={['/album/1']}>
        <HomePage />
      </MemoryRouter>,
    );
    userEvent.click(wrapper.getAllByText('More details')[1]);

    expect(wrapper.getByText('AlbumId: 1')).toBeInTheDocument();
  });
});
