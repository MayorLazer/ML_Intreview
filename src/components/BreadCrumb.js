import React from 'react';

export default function BreadCrumb(props) {
  let pages = ['Electronica Audio y Video', 'Ipod', 'Reproductores', 'IPod touch', '32 GB']
  return (
    <div className="breadCrumb">
      <span>{ props.breadCrumb.map( x => x.name ) }</span>   
      {console.log(props.breadCrumb)}  
    </div>
  );
}