import React from 'react'
import {Chart as ChartJs,CategoryScale,LinearScale,PointElement, LineElement, Title, Tooltip, ArcElement, Legend} from 'chart.js'
import {Line,Doughnut} from 'react-chartjs-2'
 ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
    Legend
)
export const LineChart = ({views=[]}) => {
    const labels=getLastYearMonths()
    const options={
        responsive:true,
        plugins:{
            legend:{
                postion:"bottom"

            },
            title:{
                display:true,
                text:"Yearly Views"
            }
        }
    }
    const data={
        labels,
        datasets:[
           { 
              label:"Views",
              data:views,
              borderColor:"rgba(107,70,193,0.5)",
              backgroundColor:"#6b46c1"
           }
        ]
    }
  return <Line options={options} data={data}/>
}

export const DoughnutChart=({users=[]})=>{
    const labels=["Subscribe","NotSubscribe"]
    const data={
        labels,
        datasets:[
           { 
              label:"Views",
             data:users,
              borderColor:['rgba(62,12,171)','rgba(214,43,129)'],
              backgroundColor:['rgba(62,12,171,0.3','rgba(214,43,129,0.3)'],
              borderWidth:1
           }
        ]
    }
   return <Doughnut data={data}/>
}

function getLastYearMonths(){
    const labels=[]

    const month=[
        "janaury",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
    ]

    const currMonth=new Date().getMonth()
    const remain=11-currMonth

    for (let i=currMonth; i<month.length; i--){
        const ele=month[i]
        labels.unshift(ele)
        if(i===0) break;
    }

    for(let i=11; i>remain; i--){
        if(i===currMonth) break;  
        const ele=month[i]
        labels.unshift(ele)
    }
    
    return labels
}
