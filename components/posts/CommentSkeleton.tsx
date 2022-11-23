import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Skeleton from '@mui/material/Skeleton';

export default function CommentSkeleton() {

  return (
    <Card style={{width: '100%'}}>
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circular" width={40} height={40} style={{borderRadius:'3px'}} />
        }
        title={
          <Skeleton animation="wave" height={10} width="10%" />
        }
        subheader={
        <>
          <Skeleton
            animation="wave"
            height={10}
            width="20%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton sx={{ height: 30, borderRadius: "3px" }} animation="wave" variant="rectangular" />
        </>
        }
      />
    </Card>
  );
}