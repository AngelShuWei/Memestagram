import './ImgLikes.css';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, useHistory } from "react-router-dom";
import { postImgLikes }  from '../../store/imageLike';


function SpotImgLikes() {
    const imgLike = useSelector(state => state.likes)
    console.log(imgLike)
}
