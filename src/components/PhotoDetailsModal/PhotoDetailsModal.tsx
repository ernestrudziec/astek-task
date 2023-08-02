import { Box, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';
import { AlbumPhoto } from '../../api/types.ts';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface PhotoDetailsModalProps {
  photos: AlbumPhoto[];
  photoId: string;
}
export const PhotoDetailsModal = ({
  photos,
  photoId,
}: PhotoDetailsModalProps) => {
  const navigate = useNavigate();

  const photo = photos.find((photo) => photo.id === Number(photoId));

  if (!photo) return null;

  const { id, url, title, albumId, thumbnailUrl } = photo;

  return (
    <Modal
      open={true}
      onClose={() => navigate(-1)}
      aria-labelledby="modal-photo-details"
      data-testid={'details-modal'}
      keepMounted
    >
      <Box sx={modalStyle}>
        <Grid
          container
          direction="row"
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography sx={{ fontWeight: 600 }}>Photo {id} details</Typography>

          <IconButton aria-label="close" onClick={() => navigate(-1)}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Stack>
          <Typography>Title: {title}</Typography>
          <Typography>Full size photo:</Typography>
          <Box sx={{ width: 300, height: 350 }}>
            <Box
              my={3}
              component={'img'}
              alt={title}
              src={url}
              sx={{ width: 300 }}
            />
          </Box>
          <Typography>AlbumId: {albumId}</Typography>
          <Typography>Thumbnail URL: {thumbnailUrl}</Typography>
          <Typography>URL: {url}</Typography>
        </Stack>
      </Box>
    </Modal>
  );
};
