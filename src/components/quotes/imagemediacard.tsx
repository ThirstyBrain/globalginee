import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface ImgMediaCardProps {
  title: string;
  description: string;
  image: string;
}

const ImgMediaCard: React.FC<ImgMediaCardProps> = ({ title, description, image }) => {
  return (
    <Card sx={{ maxWidth: 345,height: '100%', boxShadow: 3 }}>
      {/* <CardMedia
        component="img"
        alt={title}
        height="140"
        image={image}
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

export default ImgMediaCard;
