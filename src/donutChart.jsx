import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Chart from 'chart.js/auto';

export default function DonutChart({ }) {
    const [barData, setBarData] = useState([]);
    var chart;

    useEffect(() => {
        
      }, []);
    // console.log(barData)

    const data = {
        labels: ['Prix minimal', 'Prix maximal', 'Montant total'],
        datasets: [{
            label: '',
            data: [barData[0], barData[1], barData[2]],
            backgroundColor: [
                'rgb(22, 163, 74)',
                'rgb(225, 29, 72)',
                'rgb(253, 224, 71)'
            ],
            borderColor: [
                'rgb(22, 163, 74)',
                'rgb(225, 29, 72)',
                'rgb(253, 224, 71)'
            ],
            borderWidth: 1
        }]
    }

    const config = {
        type: 'doughnut',
        data,
        options: {
            tooltips: {
                mode: 'index'
            }
        }
    };

    console.log(chart)

    useEffect(() => {
        if (chart) {
            // chart.data.datasets[0].data[0] = 200;
            // chart.data.datasets[1].data[1] = 15000;
            // chart.data.datasets[2].data[2] = 2000000;

            // chart.data.labels[0] = 'Prix minimal';
            // chart.data.labels[1] = 'Prix maximal';
            // chart.data.labels[3] = 'Montant total';

            // chart.data.datasets[0].label = 'Histogramme';

            // chart.data.datasets[0].backgroundColor[0] = 'rgb(22, 163, 74)';
            // chart.data.datasets[0].backgroundColor[1] = 'rgb(225, 29, 72)';
            // chart.data.datasets[0].backgroundColor[2] = 'rgb(253, 224, 71)';


            chart.update();
            console.log("Updated");
        } else {
            axios.get('http://localhost:8080/VenteFarany/VenteServ')
          .then(response => {
            console.log(response);
    
            const newBarData = [
              response.data.minPrix,
              response.data.maxPrix,
              response.data.montantTotal,
            ];
    
            setBarData(newBarData);
          })
          .catch(error => {
            console.log(error);
            // setErrorMessage('Error retrieving data');
          });
            const ctx = document.getElementById("donutChart").getContext('2d');


            chart = new Chart(ctx, config);

            console.log("Not destroyed");
            
        }

    }, [])

    return (<canvas id='donutChart'></canvas>);
}

