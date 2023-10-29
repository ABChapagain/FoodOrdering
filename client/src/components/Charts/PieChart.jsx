import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = ({ totalSales }) => {
  const [sales, setSales] = useState([])

  const data = {
    labels: [
      'Africa',
      'Asia',
      'Europe',
      'North America',
      'South America',
      'Others',
    ],
    datasets: [
      {
        label: 'Number of Sales',
        data: [1, 2, 3, 4, 5, 6],
        backgroundColor: [1, 2, 3, 4, 5].map(() => {
          const randomColor = `rgba(${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, 0.2)`
          return randomColor
        }),
        borderColor: [1, 2, 3, 4, 5].map(() => {
          const randomColor = `rgba(${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, 0.2)`
          return randomColor
        }),
        borderWidth: 1,
      },
    ],
  }
  return (
    <div className='mb-20 bg-white py-3 shadow-sm px-4 rounded'>
      <h1 className='text-center text-2xl font-bold mb-2'>
        Total Sales : {totalSales}
      </h1>
      <p className='text-center mb-7'>
        Users according to geographic locations
      </p>
      <Pie height={100} data={data} />
    </div>
  )
}

export default PieChart
