import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory,{Type} from 'react-bootstrap-table2-editor';

const BootTable = () => {

  const [data, setdata] = useState([])

  useEffect(() => {
    getdata();
  },[]);

  const getdata=()=>{
    axios("https://jsonplaceholder.typicode.com/comments").then(res=>setdata(res.data)).then(console.log(data));
  }

  const desformate =(data, row) =>{
    return(
      <>
        <span className='tableDes'>{data}</span>
      </>
    )
  }

  const nameformate =(data, row) =>{
    return(
      <>
        <span className='tableName'>{data}</span>
      </>
    )
  }

const selectRow ={
  mode:"checkbox",
  clickToSelect:true,
  clickToEdit:true,
  selected:[1,2]
}

  const columns=[
    {
      dataField:"id",
      text:"#",
      editable:false
    },    
  {
    dataField:"name",
    text:"Name",
    editable:false,
    filter: textFilter(),
    formatter:nameformate
  },
  {
    dataField:"postId",
    text:"Poster Id",
    validator:(newvalue,row,column)=>{
      if(isNaN(newvalue)){
        return{
          valid:false,
          message:"Enter Only Number",
        };
        return true
      }
    }
  },
    {
    dataField:"email",
    text:"Email",
    editable:false
  },
  {
    dataField:"body",
    text:"Description",
    filter: textFilter(),
    formatter:desformate
  }
  // {
  //   dataField:"dropdown",
  //   text:"Dpropdown",
  //   editor:{
  //     type: Type.SELECT,
  //     options:[
  //       {
  //       value: "A",
  //       label: "A",
  //     },
  //     {
  //       value: "B",
  //       label: "B",
  //     },
  //   ],
  //   },
  // },
]

  return (
    <>
    <div id='Bootstrap_Table'>
      <div className='container'>
        <div className='row'>
          <BootstrapTable 
            keyField="id"
            data={data}
            columns={columns}
            striped
            hover
            condensed
            pagination={paginationFactory({
              // sizePerPage: 5,
              // paginationSize: 8,
              // sizePerPageList: [{
              //   text: '5', value: 8
              // }, {
              //   text: '10', value: 8
              // }, {
              //   text: 'All', value: data.length
              // }],
            })}
            cellEdit={cellEditFactory({
              mode:"dbclick",
              blurToSave:true,
              nonEditableRows:()=>[1,2]
            })}
            selectRow={selectRow}
            filter={ filterFactory() }
          />
        </div>
      </div>
    </div>
      
    </>
  )
}

export default BootTable;
