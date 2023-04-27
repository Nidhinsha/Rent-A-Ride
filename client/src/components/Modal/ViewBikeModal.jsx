import React from 'react'
import BasicModal from '../BasicModal/BasicModal'
import { Box, Typography } from '@mui/material'
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Carousel } from 'primereact/carousel';

function ViewBikeModal({open,onClose,bikeImage}) {
  const bikeDisplay = (image) => {
    return (
      <div className="p-d-flex p-ai-center p-jc-center" style={{ height: '300px' }}>
        <img src={image} alt="" style={{ width: '100%', height: '100%' }}  />
      </div>
    );
  };


  return (
    <BasicModal
        open={open}
        onClose={onClose}
        title='Image of Bikes'
        content={
          <div className="card flex justify-content-center">
          <Carousel value={bikeImage} numVisible={1} numScroll={1} orientation="vertical" verticalViewPortHeight="300px" itemTemplate={bikeDisplay} />
        </div>
        }
    />

  )
}

export default ViewBikeModal
