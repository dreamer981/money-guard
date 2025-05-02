import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const Chart = () => {

    const data = {
        labels: ['Pink', 'Blue', 'Light Blue', 'Yellow', 'Green', 'Light Green', 'Purple', 'Light Purple', 'Light Pink'],
        datasets: [{
            label: 'Currency Chart',
            data: [],
            backgroundColor: [
                'rgba(253, 148, 152, 1)',
                'rgba(74, 86, 226, 1)',
                'rgba(129, 225, 255, 1)',
                'rgba(254, 208, 87, 1)',
                'rgba(0, 173, 132, 1)',
                'rgba(36, 204, 167, 1)',
                'rgba(110, 120, 232, 1)',
                'rgba(197, 186, 255, 1)',
                'rgba(255, 216, 208, 1)',
            ],
            hoverOffset: 4
        }]
    };

    return (
        <Doughnut data={data} />
    )
};

export default Chart