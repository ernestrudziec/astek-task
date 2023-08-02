import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { PhotoDetailsModal } from '../../components/PhotoDetailsModal';
import { PhotosList } from '../../components/PhotosList';
import { useHomePage } from './useHomePage.ts';
import { useEffect } from 'react';

export const HomePage = () => {
  const {
    handleSubmitSearch,
    handlePaginationChange,
    handleSubmitAlbum,
    photos,
    photoId,
    albumId,
    paginationCount,
    isPagination,
    isLoading,
    isError,
  } = useHomePage();

  return (
    <Stack alignItems={'center'}>
      <Grid container justifyContent={'center'}>
        <Stack
          component="form"
          onSubmit={handleSubmitAlbum}
          sx={{ width: 300, my: 6 }}
        >
          <Typography>Type album number:</Typography>
          <TextField sx={{ mt: 2 }} type="number" name={'albumId'} required />
          <Button type="submit" sx={{ mt: 2 }}>
            Confirm
          </Button>
        </Stack>

        {albumId && (
          <Stack
            component="form"
            onSubmit={handleSubmitSearch}
            sx={{ width: 300, my: 6, ml: 3 }}
          >
            <Typography>Type photo title to search:</Typography>

            <TextField sx={{ mt: 2 }} type="text" name={'search'} />
            <Button type="submit" sx={{ mt: 2 }}>
              Search
            </Button>
          </Stack>
        )}
      </Grid>

      {!isLoading && !isError && photos && (
        <>
          {albumId && <PhotosList photos={photos} />}
          {photoId && <PhotoDetailsModal photos={photos} photoId={photoId} />}
        </>
      )}

      {isPagination ? (
        <Pagination
          count={paginationCount}
          data-testid={'pagination'}
          sx={{ mt: 6 }}
          onChange={handlePaginationChange}
        />
      ) : null}

      {isLoading && (
        <Box
          sx={{ minHeight: '70vh' }}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <CircularProgress data-testid={'mui-loader'} />
        </Box>
      )}
      {isError && <Alert severity="error">Unknown error!</Alert>}
    </Stack>
  );
};
