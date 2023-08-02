import { AlbumPhoto } from './types.ts';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getPhotosByAlbumId = async ({
  albumId,
  queryParams,
}: {
  albumId: number;
  queryParams: URLSearchParams;
}) => {
  const response = await fetch(
    `${API_BASE_URL}/albums/${albumId}/photos?${queryParams}`,
  );

  if (response?.ok) {
    const totalCount = response.headers.get('X-Total-Count');
    return { totalCount, photos: await response.json() } as unknown as {
      totalCount: number;
      photos: AlbumPhoto[];
    };
  } else {
    throw new Error(
      `Photos failed to fetch. Response code: ${response?.status}`,
    );
  }
};
