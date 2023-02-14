import React from 'react'
import { UserData } from './ChartData'
import { useState } from 'react'
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS } from 'chart.js/auto';

export default function Chart() {

  const [userData, setUserData] = useState({
    labels: ['revenue', 'expense'],
    datasets: [
      {
        label: "Disposable Income",
        data: UserData.map((data) => data.income),
        backgroundColor:[
          "green",
          "red",
        ],
        borderColor: "black",
        borderWidth: "2",
      },
    ],
  });
  return (
    <div className="chart" style={{width: 100}}>
      <Doughnut data={userData} />

    </div>
  )
}

