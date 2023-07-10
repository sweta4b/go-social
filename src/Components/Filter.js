import { Button } from '@mui/material'
import React from 'react'
import { usePost } from '../Context/PostContext';

function Filter() {
    const {dataDispatch} = usePost();
    return (
        <>
        <div style={{display:'flex',justifyContent:'center', gap:'10px', marginTop:'10px'}}>
            <Button onClick={() => dataDispatch({type:'sort', payload:'trending'})} variant='contained' sx={{bgcolor:'#d62b70'}}>Trending</Button>
            <Button onClick={() => dataDispatch({type:'sort', payload:'latest'})} variant='contained' sx={{bgcolor:'#d62b70'}}>Latest</Button>
        </div>
        </>
    )
}

export default Filter
