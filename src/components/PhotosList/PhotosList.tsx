import { AlbumPhoto } from '../../api/types.ts';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const titleStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
};
export interface PhotosListProps {
  photos: AlbumPhoto[];
}

export const PhotosList = ({ photos }: PhotosListProps) => {
  const { search } = useLocation();

  return (
    <Grid
      container
      direction={'row'}
      justifyContent={'center'}
      sx={{ maxWidth: 1000 }}
    >
      {photos?.map(({ id, title, thumbnailUrl }) => (
        <Card key={id} sx={{ width: 150, margin: 2 }}>
          <CardMedia sx={{ height: 150 }} image={thumbnailUrl} title={title} />
          <CardContent sx={{ height: 40 }}>
            <Tooltip title={title} placement={'top'}>
              <Typography
                gutterBottom
                variant="h6"
                fontSize={'14px'}
                sx={titleStyle}
              >
                {title}
              </Typography>
            </Tooltip>
          </CardContent>
          <CardActions>
            <Link to={`photo/${id}${search}`} relative={'path'}>
              <Button size="small">More details</Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
};
