import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPhotosByAlbumId } from '../../api/photos.ts';
import { ChangeEvent, FormEvent, useEffect } from 'react';

const PHOTOS_PER_PAGE = 10;

export const useHomePage = () => {
  const navigate = useNavigate();

  const { albumId, photoId } = useParams();

  const [queryParams, setQueryParams] = useSearchParams({
    _start: String(0),
    _limit: String(PHOTOS_PER_PAGE),
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['albumPhotos', albumId, queryParams],
    queryFn: () =>
      getPhotosByAlbumId({ albumId: Number(albumId), queryParams }),
    enabled: !!albumId,
  });

  const photos = data?.photos;
  const totalCount = Number(data?.totalCount);
  const paginationCount = Math.round(totalCount / PHOTOS_PER_PAGE);

  const isPagination = totalCount && paginationCount > 1;

  const handleSubmitAlbum = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { albumId } = e.currentTarget;
    navigate(`/album/${albumId.value}?${queryParams}`);
    setQueryParams((queryParams) => {
      queryParams.set('_start', '0');
      return queryParams;
    });
  };
  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { search } = e.currentTarget;
    setQueryParams((queryParams) => {
      queryParams.set('q', search.value);
      queryParams.set('_start', '0');
      return queryParams;
    });
  };
  const handlePaginationChange = (_e: ChangeEvent<unknown>, value: number) => {
    setQueryParams((queryParams) => {
      queryParams.set('_start', String((value - 1) * PHOTOS_PER_PAGE));
      queryParams.set('_limit', String(PHOTOS_PER_PAGE));
      return queryParams;
    });
  };

  useEffect(() => {
    refetch();
  }, [queryParams, refetch]);

  return {
    handleSubmitSearch,
    handleSubmitAlbum,
    handlePaginationChange,
    photos,
    photoId,
    albumId,
    paginationCount,
    isPagination,
    isLoading,
    isError,
  };
};
